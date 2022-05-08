import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksEntity } from './tasks.entity';
import { v4 as uuid } from 'uuid';
import { CreateTaskInput, DeleteTask, TaskStatus } from './tasks.graphql';
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

    async getTask(id: string): Promise<TasksEntity> {
        return this.taskRepository.findOne({ id })
    }

    async deleteTask(id: string): Promise<DeleteTask> {
         this.taskRepository.delete({ id })
         return {message: `${id} deleted successfully.`}
    }
}
