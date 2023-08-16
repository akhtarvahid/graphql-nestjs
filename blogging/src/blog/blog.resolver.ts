import { Resolver, Query } from "@nestjs/graphql";
import { BlogType } from "./blog.schema";

@Resolver(type => BlogType)
export class BlogResolver {


    @Query(blog => BlogType)
    blog() {
        return {
            id: 1,
            title: 'Reactjs',
            description: 'Learn something new'
        }
    }
}