import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './student.entity';
import { StudentResolver } from './student.resolver';
import { StudentService } from './student.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  providers: [StudentResolver, StudentService],
  exports: [StudentService],
})
export class StudentModule {}
