import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { StudentType } from './student.graphql';
import { StudentService } from './student.service';

@Resolver((_returns) => StudentType)
export class StudentResolver {
  @Inject() studentService: StudentService;

  @Mutation((type) => StudentType)
  createStudent(@Args('name') name: string) {
    return this.studentService.create(name);
  }

  @Query((type) => [StudentType])
  getStudents() {
    return this.studentService.students();
  }
  @Query((type) => StudentType)
  getStudent(@Args('id') id: string) {
    return this.studentService.student(id);
  }
}
