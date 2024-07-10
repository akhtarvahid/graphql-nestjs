import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { BlogType, CreateBlogInput, DeleteResponse } from "./blog.schema";
import { Inject, UseGuards } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { AuthGuard } from "src/auth/auth.guard";
import { AuthService } from "src/auth/auth.service";

@Resolver(type => BlogType)
export class BlogResolver {
    @Inject() blogService: BlogService;
    @Inject() authService: AuthService;

    @Query(blog => BlogType)
    blog(@Args('id') id: string) {
        return this.blogService.getBlog(id);
    }

    @Query(returns=> [BlogType])
    blogs() {
        return this.blogService.getBlogs();
    }

    @Mutation(returns => BlogType)
    @UseGuards(new AuthGuard())
    async createBlog(
        @Args('CreateBlogInput') createBlogInput: CreateBlogInput,
        @Context('req') request: any
    ) {
       const user = await this.authService.getUserInfo(request);
       return this.blogService.createBlog(createBlogInput, user);
    }

    @Mutation(returns => BlogType)
    @UseGuards(new AuthGuard())
    updateBlog(@Args("id") id: string, @Args('title') title: string, @Args('description') description: string, @Args('image') image: string, @Args('author') author: string) {
       return this.blogService.updateBlog(id, title, description, image, author);
    }

    @Mutation(returns => DeleteResponse)
    @UseGuards(new AuthGuard())
    deleteBlog(@Args('id') id: string) {
        return this.blogService.deleteBlog(id);
    }
}