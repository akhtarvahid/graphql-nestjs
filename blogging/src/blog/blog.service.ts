import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BlogEntity } from "./blog.entity";
import { Repository } from "typeorm";
import { v4 as uuid } from 'uuid'; 
import { CreateBlogInput, DeleteResponse } from "./blog.schema";

@Injectable()
export class BlogService {
    constructor(@InjectRepository(BlogEntity) private blogRepository: Repository<BlogEntity>){}

    async getBlogs(): Promise<BlogEntity[]> {
      return this.blogRepository.find({});
    }
    async getBlog(id: string): Promise<BlogEntity> {
        return this.blogRepository.findOneBy({ id });
    }

    async createBlog(createBlogInput: CreateBlogInput, user: any): Promise<BlogEntity> {
        const { title, description, image, author } = createBlogInput;
        const blog = await this.blogRepository.create({
            id: uuid(),
            title,
            description,
            image,
            author,
            created: new Date().toUTCString(),
            modified: new Date().toUTCString(),
            userId: user.username
        });

        return this.blogRepository.save(blog);
    }

   async updateBlog(id: string, title: string, description: string, image: string, author: string): Promise<BlogEntity> {
      const blog = await this.getBlog(id);

      blog.title = title;
      blog.description = description;
      blog.image = image;
      blog.author = author;

      return this.blogRepository.save(blog);
   }

   async deleteBlog(id: string): Promise<DeleteResponse> {
      await this.blogRepository.delete({ id });
      let response = {
        message: `Blog for (${id}) deleted successfully`
      }

      return response;
   }
}