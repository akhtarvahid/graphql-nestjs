import { Module } from '@nestjs/common';
import { BlogResolver } from './blog.resolver';
import { BlogService } from './blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from './blog.entity';

@Module({
    imports :[TypeOrmModule.forFeature([BlogEntity])],
    providers: [BlogResolver, BlogService]
})
export class BlogModule {}
