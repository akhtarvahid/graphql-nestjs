import { Inject } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { StudentService } from 'src/student/student.service';
import { SubjectEntity } from './subject.entity';
import {
  AssignStudentsToSubjectInput,
  CreateSubjectInput,
  SubjectType,
} from './subject.graphql';
import { SubjectService } from './subject.service';

@Resolver((of) => SubjectType)
export class SubjectResolver { 
    

  @Inject() subjectService: SubjectService;
  @Inject() studentService: StudentService;

  @Mutation((type) => SubjectType)
  createSubject(
    @Args('createSubjectInput') createSubjectInput: CreateSubjectInput,
  ) {
    return this.subjectService.createSubject(createSubjectInput);
  }

  @Query((type) => [SubjectType])
  getSubjects() {
    return this.subjectService.subjects();
  }

  @Query((type) => SubjectType)
  getSubject(@Args('id') id: string) {
    return this.subjectService.subject(id);
  }
  @Mutation(() => SubjectType)
  assignStudentsToSubject(
    @Args('assignStudentsToSubjectInput')
    assignStudentsToSubject: AssignStudentsToSubjectInput,
  ) {
    const { subjectId, studentIds } = assignStudentsToSubject;
    return this.subjectService.assignStudentsToSubject(subjectId, studentIds);
  }

  @ResolveField()
  async students(@Parent() subject: SubjectEntity) {

    return await this.studentService.getManyStudents(subject.students);
  }
};

