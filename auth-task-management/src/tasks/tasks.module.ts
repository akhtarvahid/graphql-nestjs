import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from './tasks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TasksEntity])],
  providers: [TasksService, TasksResolver]
})
export class TasksModule {}
