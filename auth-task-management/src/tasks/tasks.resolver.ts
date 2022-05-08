import { Inject } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { TaskType } from './tasks.graphql';
import { TasksService } from './tasks.service';

@Resolver('Tasks')
export class TasksResolver {
    @Inject() taskService: TasksService;

    @Query(_type => [TaskType])
    getTasks() {
        return this.taskService.getTasks();
    }
}
