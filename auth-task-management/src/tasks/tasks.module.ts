import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from './tasks.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TasksEntity]), AuthModule],
  providers: [TasksService, TasksResolver]
})
export class TasksModule {}
