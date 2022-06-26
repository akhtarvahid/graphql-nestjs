import { Inject, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.gaurd';

import { CreateTaskInput, DeleteTask, FilterAndSearch, TaskStatus, TaskType, UpdateTaskStatusInput } from './tasks.graphql';
import { TasksService } from './tasks.service';

@Resolver('Tasks')
@UseGuards(new AuthGuard())
export class TasksResolver {
    @Inject() taskService: TasksService;

    @Mutation(()=> TaskType)
    createTask(@Args('create') createTaskInput: CreateTaskInput) {
        return this.taskService.createTask(createTaskInput)
    }

    @Query(_type=> [TaskType])
    getTasks(@Args('filterAndSearch') filterAndSearch: FilterAndSearch) {

        if(Object.keys(filterAndSearch)?.length !== 0) {
           return this.taskService.getTasksWithFilterAndSearch(filterAndSearch);
        }

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

    @Mutation(_type=> TaskType)
    updateTaskStatus(@Args('update') updateTaskStatus: UpdateTaskStatusInput) {
        return this.taskService.updateTaskByStatus(updateTaskStatus);
    }
}
