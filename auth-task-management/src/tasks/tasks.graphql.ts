import { Field, InputType, ObjectType } from "@nestjs/graphql";

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
}

export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

@InputType()
export class CreateTaskInput {
    @Field()
    title: string;

    @Field()
    description: string;
}

@ObjectType()
export class DeleteTask{
    @Field()
    message: string
}