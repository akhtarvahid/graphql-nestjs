import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@ObjectType()
export class Project {
  @Field()
  id: string;

  @Field()
  project_title: string;

  @Field()
  project_location: string;
}

@InputType()
export class CreateProjectInput {
  @Field()
  @IsNotEmpty()
  @MinLength(1, {
    message: 'Project title is too short',
  })
  project_title: string;

  @Field()
  @IsNotEmpty()
  @MinLength(1, {
    message: 'Project location text is too short',
  })
  project_location: string;
}
