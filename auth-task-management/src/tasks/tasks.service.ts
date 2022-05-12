import { Injectable } from '@nestjs/common';
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

    async getTasks(filterAndSearch: FilterAndSearch): Promise<TasksEntity[]> {
       const { status, search } = filterAndSearch
       const tasks = await this.taskRepository.find();
       if(search && status) {
           return tasks.filter(task => task.title.includes(search) && task.status === status);
       }
        if(search) {
            return tasks.filter(task => task.title.includes(search));
        }
        if(status) {
            return tasks.filter(task => task.status === status);
        }

        return tasks;
    }

    async getTask(id: string): Promise<TasksEntity> {
        return this.taskRepository.findOne({ id })
    }

    async deleteTask(id: string): Promise<DeleteTask> {
         await this.taskRepository.delete({ id })
         return { 
             message: `${id} deleted successfully.`
        }
    }
    async updateTaskByStatus(updateTaskStatus: UpdateTaskStatusInput): Promise<TasksEntity> {
        const task = await this.taskRepository.findOne({ id: updateTaskStatus.id });
        task.status = updateTaskStatus.status;
        return this.taskRepository.save(task)
    }
}
