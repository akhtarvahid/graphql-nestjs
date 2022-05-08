import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    private tasks = [];

    getTasks() {
        return this.tasks.concat([{id: 23, title: 'First title'}, {id: 1, title: 'Second title'}])
    }
}
