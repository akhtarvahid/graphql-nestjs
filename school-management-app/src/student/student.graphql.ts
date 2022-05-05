import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@ObjectType('Student')
export class StudentType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  contactNo: string;

  @Field()
  email: string;

  @Field()
  address: string;

  @Field()
  nationality: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateStudentInput {
  @Field()
  name: string;

  @Field()
  @MinLength(10)
  contactNo: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MaxLength(100)
  address: string;

  @Field()
  nationality: string;
}
