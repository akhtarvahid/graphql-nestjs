import { Field, ID, ObjectType } from "@nestjs/graphql";
import { IsOptional } from "class-validator";


@ObjectType('Blog')
export class BlogType {
    @Field(type => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    description: string;

    @Field()
    image: string;

    @Field()
    author: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    created?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    modified?: string;
}