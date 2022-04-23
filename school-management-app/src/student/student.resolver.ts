import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateStudentInput, StudentType } from './student.graphql';
import { StudentService } from './student.service';

@Resolver((_returns) => StudentType)
export class StudentResolver {
  @Inject() studentService: StudentService;

  @Mutation((type) => StudentType)
  createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput ) {
    return this.studentService.create(createStudentInput);
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
