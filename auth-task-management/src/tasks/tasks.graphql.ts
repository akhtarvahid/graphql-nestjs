import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TaskType {
    @Field()
    id: string

    @Field()
    title: string;

    @Field()
    description: string;

    @Field()
    status: TaskStatus;
}

enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}