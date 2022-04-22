import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { StudentType } from 'src/student/student.graphql';

@ObjectType('Subject')
export class SubjectType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;

  @Field((type) => [StudentType])
  students: string[];
}

@InputType()
export class CreateSubjectInput {
  @Field()
  name: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;

  @IsUUID('4', { each: true })
  @Field(() => [ID], { defaultValue: [] })
  students: string[];
}

@InputType()
export class AssignStudentsToSubjectInput {
  @IsUUID()
  @Field((type) => ID)
  subjectId: string;

  @IsUUID('4', { each: true })
  @Field((type) => [ID])
  studentIds: string[];
}
