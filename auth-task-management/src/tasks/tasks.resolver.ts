import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateTaskInput, DeleteTask, TaskType } from './tasks.graphql';
import { TasksService } from './tasks.service';

@Resolver('Tasks')
export class TasksResolver {
    @Inject() taskService: TasksService;

    @Mutation(()=> TaskType)
    createTask(@Args('create') createTaskInput: CreateTaskInput) {
        return this.taskService.createTask(createTaskInput)
    }

    @Query(_type=> [TaskType])
    getTasks() {
        return this.taskService.getTasks();
    }

    @Query(_type=> TaskType)
    getTask(@Args('id') id: string) {
        return this.taskService.getTask(id);
    }

    @Mutation(_type=> DeleteTask)
    deleteTask(@Args('id') id: string) {
        return this.taskService.deleteTask(id);
    }
}
