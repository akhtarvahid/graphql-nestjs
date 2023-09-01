import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateArticleDto } from './dto/createArticle.dto';
import { UserEntity } from '@app/user/user.entity';
import { ArticleResponseInterface } from './types/ArticleResponse.interface';
import slugify from 'slugify';

@Injectable()
export class ArticleService {
    constructor(@InjectRepository(ArticleEntity) private readonly articleRepository: Repository<ArticleEntity>){}

    async create(currentUser: UserEntity, createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
        const newArticle = new ArticleEntity();
        Object.assign(newArticle, createArticleDto);

        if(!newArticle.tagList) {
            newArticle.tagList = [];
        }
        newArticle.slug = this.getSlug(createArticleDto.title);

        newArticle.author = currentUser;

        return await this.articleRepository.save(newArticle);
    }

    async delete(slug: string, id: number): Promise<DeleteResult> {
      const article = await this.findBySlug(slug);

      if(!article) {
        throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND)
      }
      
      if(article.author.id !== id) {
        throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
      }

      return await this.articleRepository.delete({ slug });
    }

    buildArticleResponse(article: ArticleEntity): ArticleResponseInterface {
      return { article }
    }

    private getSlug(title: string): string {
      return (
        slugify(title , { lower: true }) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
      );
    }

    async findBySlug(slug: string): Promise<ArticleEntity> {
      return await this.articleRepository.findOne({ where: { slug }});
    }

    async updateArticle(id: number, slug: string, updateArticleDto: CreateArticleDto): Promise<ArticleEntity> {
      const article = await this.findBySlug(slug);

      if(!article) {
        throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND)
      }
      
      if(article.author.id !== id) {
        throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
      }

      Object.assign(article, updateArticleDto);

      return await this.articleRepository.save(article);
    }
}
