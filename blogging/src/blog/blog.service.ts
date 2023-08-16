import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BlogEntity } from "./blog.entity";
import { Repository } from "typeorm";
import { Args } from "@nestjs/graphql";
import { v4 as uuid } from 'uuid'; 

@Injectable()
export class BlogService {
    constructor(@InjectRepository(BlogEntity) private blogRepository: Repository<BlogEntity>){}

    async createBlog(title: string, description: string): Promise<BlogEntity> {
        const blog = this.blogRepository.create({
            id: uuid(),
            title,
            description
        });

        return this.blogRepository.save(blog);
    }
}