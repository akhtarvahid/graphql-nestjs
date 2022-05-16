import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksEntity } from './tasks.entity';
import { v4 as uuid } from 'uuid';
import { CreateTaskInput, DeleteTask, FilterAndSearch, TaskStatus, UpdateTaskStatusInput } from './tasks.graphql';
@Injectable()
export class TasksService {
    constructor(@InjectRepository(TasksEntity) private taskRepository: Repository<TasksEntity>){}


    async createTask(createTaskInput: CreateTaskInput): Promise<TasksEntity> {
        const { title, description } = createTaskInput;
        const task = this.taskRepository.create({
          id: uuid(),
          title,
          description
        });
        return this.taskRepository.save(task);
    }

    async getTasks(): Promise<TasksEntity[]> {
       return this.taskRepository.find();
    }

    async getTasksWithFilterAndSearch(filterAndSearch: FilterAndSearch): Promise<TasksEntity[]> {
        const { status, search } = filterAndSearch
        let tasks = await this.taskRepository.find();
        const inputText = search.toLocaleLowerCase();
        const searchedInput = (text) => text.toLocaleLowerCase().includes(inputText);
        
        if(search && status) {
            tasks = tasks.filter(task => {
                return task.status === status && 
                (searchedInput(task.title) || searchedInput(task.description))
            });
        }
        
        if(search) {
             tasks = tasks.filter(({ title, description }) => {
                 return searchedInput(title) || searchedInput(description)
             });
        }
        
        if(status) {
             tasks = tasks.filter(task => task.status === status);
        }
 
         return tasks;
    }

    async getTask(id: string): Promise<TasksEntity> {
        const task = await this.taskRepository.findOne({ id });

        if(!task) {
          throw new NotFoundException(`Task not found related to ID: ${id}`);
        }

        return task;
    }

    async deleteTask(id: string): Promise<DeleteTask> {
         await this.taskRepository.delete({ id })
         return { 
             message: `${id} deleted successfully.`
        }
    }
    async updateTaskByStatus(updateTaskStatus: UpdateTaskStatusInput): Promise<TasksEntity> {
        const { id } = updateTaskStatus;
        const task = await this.getTask(id);
        task.status = updateTaskStatus.status;
        return this.taskRepository.save(task)
    }
}
