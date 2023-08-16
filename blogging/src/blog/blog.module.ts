import { Module } from '@nestjs/common';
import { BlogResolver } from './blog.resolver';
import { BlogService } from './blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from './blog.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports :[TypeOrmModule.forFeature([BlogEntity]), AuthModule],
    providers: [BlogResolver, BlogService]
})
export class BlogModule {}
