import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/createArticle.dto';
import { UserEntity } from '@app/user/user.entity';

@Injectable()
export class ArticleService {
    constructor(@InjectRepository(ArticleEntity) private readonly articleRepository: Repository<ArticleEntity>){}

    async create(currentUser: UserEntity, createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
        const newArticle = new ArticleEntity();
        Object.assign(newArticle, createArticleDto);

        if(!newArticle.tagList) {
            newArticle.tagList = [];
        }
        newArticle.slug = 'dummy';

        newArticle.author = currentUser;

        return await this.articleRepository.save(newArticle);
    }
}
