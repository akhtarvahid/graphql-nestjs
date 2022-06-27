import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

        const found = await this.getTasks();
        if (found && found.some((f) => f.title === createTaskInput.title)) {
          throw new ConflictException('Task already exist with this title');
        }

        const task = this.taskRepository.create({
          id: uuid(),
          title,
          description
        });
        await this.taskRepository.save(task);
        return task;
    }

    async getTasks(): Promise<TasksEntity[]> {
       return this.taskRepository.find();
    }

    async getTasksWithFilterAndSearch(filterAndSearch: FilterAndSearch): Promise<TasksEntity[]> {
      const { status, search } = filterAndSearch;

      const query = this.taskRepository.createQueryBuilder('task');
     
      if(status) {
        query.andWhere('task.status = :status', { status })
      }
      if(search) {
          query.andWhere(
              'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
              { search: `%${search}%`},
          )
      }

      const tasks = await query.getMany();
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

       const found = await this.getTask(id);
       if(found) {
         await this.taskRepository.delete({ id });
         return { 
            message: `${id} deleted successfully.`
         }
       }
    }
    async updateTaskByStatus(updateTaskStatus: UpdateTaskStatusInput): Promise<TasksEntity> {
        const task = await this.getTask(updateTaskStatus.id);
        task.status = updateTaskStatus.status;
        await this.taskRepository.save(task);
        
        return task;
    }
}
