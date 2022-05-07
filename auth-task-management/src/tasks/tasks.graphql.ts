import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TaskType {
    @Field()
    id: string

    @Field()
    title: string;
}