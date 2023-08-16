import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { BlogType } from "./blog.schema";
import { Inject } from "@nestjs/common";
import { BlogService } from "./blog.service";

@Resolver(type => BlogType)
export class BlogResolver {
    @Inject() blogService: BlogService;

    @Query(blog => BlogType)
    blog() {
        return {
            id: 1,
            title: 'Reactjs',
            description: 'Learn something new'
        }
    }

    @Mutation(returns => BlogType)
    async createBlog(@Args('title') title: string, @Args('description') description: string) {
       return this.blogService.createBlog(title, description);
    }
}