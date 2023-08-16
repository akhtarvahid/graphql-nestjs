import { Module } from '@nestjs/common';
import { BlogResolver } from './blog.resolver';

@Module({
    providers: [BlogResolver]
})
export class BlogModule {}
