import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

@ObjectType()
export class TaskType {
    @Field()
    id: string

    @Field()
    title: string;

    @Field()
    description: string;

    @Field()
    status: string;

    @Field()
    createdAt: Date;
  
    @Field()
    updatedAt: Date;
}

export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

@InputType()
export class CreateTaskInput {
    @Field()
    @IsNotEmpty()
    title: string;

    @Field()
    @IsNotEmpty()
    description: string;
}

@ObjectType()
export class DeleteTask{
    @Field()
    message: string
}

@InputType()
export class UpdateTaskStatusInput {
    @Field()
    id: string;

    @Field()
    @IsEnum(TaskStatus)
    status: TaskStatus;
}

@InputType()
export class FilterAndSearch {

    @Field(() => String , { nullable: true })
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    search?: string;
}