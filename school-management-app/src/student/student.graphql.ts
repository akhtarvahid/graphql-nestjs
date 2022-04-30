import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@ObjectType('Student')
export class StudentType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  @IsNotEmpty()
  contactNo: string;

  @Field()
  address: string;

  @Field()
  nationality: string;
}

@InputType()
export class CreateStudentInput {
  @Field()
  name: string;

  @Field()
  @MinLength(10)
  contactNo: string;

  @Field()
  @MaxLength(100)
  address: string;

  @Field()
  nationality: string;
}