import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/createArticle.dto';

@Injectable()
export class ArticleService {
    constructor(@InjectRepository(ArticleEntity) private readonly articleRepository: Repository<ArticleEntity>){}

    async create(createArticleDto: CreateArticleDto) {
        const newArticle = new ArticleEntity();
        Object.assign(newArticle, createArticleDto);
        return await this.articleRepository.save(newArticle);
    }
}
