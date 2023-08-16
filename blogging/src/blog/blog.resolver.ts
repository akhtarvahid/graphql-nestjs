import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { BlogType } from "./blog.schema";
import { Inject } from "@nestjs/common";
import { BlogService } from "./blog.service";

@Resolver(type => BlogType)
export class BlogResolver {
    @Inject() blogService: BlogService;

    @Query(blog => BlogType)
    blog(@Args('id') id: string) {
        return this.blogService.getBlog(id);
    }

    @Query(returns=> [BlogType])
    blogs() {
        return this.blogService.getBlogs();
    }

    @Mutation(returns => BlogType)
    createBlog(@Args('title') title: string, @Args('description') description: string, @Args('image') image: string, @Args('author') author: string) {
       return this.blogService.createBlog(title, description, image, author);
    }

    @Mutation(returns => BlogType)
    updateBlog(@Args("id") id: string, @Args('title') title: string, @Args('description') description: string, @Args('image') image: string, @Args('author') author: string) {
       return this.blogService.updateBlog(id, title, description, image, author);
    }
}