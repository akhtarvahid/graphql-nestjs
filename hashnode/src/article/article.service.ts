import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { DataSource, DeleteResult, Repository, getRepository } from 'typeorm';
import { CreateArticleDto } from './dto/createArticle.dto';
import { UserEntity } from '@app/user/user.entity';
import { ArticleResponseInterface } from './types/ArticleResponse.interface';
import slugify from 'slugify';
import { ArticlesResponseInterface } from './types/articlesResponse.interface';

@Injectable()
export class ArticleService {
    constructor(
     @InjectRepository(ArticleEntity) private readonly articleRepository: Repository<ArticleEntity>,
     @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
     private dataSource: DataSource
    ){}

    async findAll(id: number, query: any): Promise<ArticlesResponseInterface> {
      const queryBuilder = this.dataSource.getRepository(ArticleEntity)
      .createQueryBuilder('articles').leftJoinAndSelect('articles.author', 'author');

      if(query.tag) {
        queryBuilder.andWhere('articles.tagList LIKE :tag', {
          tag: `%${query.tag}`,
        })
      }

      if(query.author) {
        const author = await this.userRepository.findOne({
          where: {
            username: query.author
          }
        });

        if(!author) {
          throw new HttpException('Username does not exist', HttpStatus.NOT_FOUND);
        }

        queryBuilder.andWhere('articles.authorId = :id', {
          id: author.id,
        })
      }

      if(query.favorited) {
        const author = await this.userRepository.findOne({ 
          where: { username: query.favorited  },
          relations : ['favorites']
        })

        const ids = author?.favorites.map((fav) => fav.id);
        if(ids.length > 0) {
          queryBuilder.andWhere('articles.id IN (:...ids)', { ids });
        } else {
          queryBuilder.andWhere('1=0');
        }
      }

      queryBuilder.orderBy('articles.createdAt', 'DESC');
      const articlesCount = await queryBuilder.getCount();

      if(query.limit) {
        queryBuilder.limit(query.limit);
      }

      if(query.offset) {
        queryBuilder.offset(query.offset);
      }

      let favoriteIds: number[] = [];
      if(id) {
        const currentUser = await this.userRepository.findOne({
          where: { id },
          relations: ['favorites']
        })
        console.log(currentUser)

        favoriteIds = currentUser.favorites.map(fav => parseInt(fav.id));
      }

      const articles = await queryBuilder.getMany();
      const articleWithFavorited = articles.map(article => {
        const favorited = favoriteIds.includes(parseInt(article.id));
        return { ...article, favorited }
      })

       return { articles: articleWithFavorited, articlesCount };
    }

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

    async addArticleToFavorites(slug, userId): Promise<ArticleEntity> {
      const article = await this.findBySlug(slug);
      const user = await this.userRepository.findOne({
        where: {id: userId},
        relations: ['favorites']
      })

      const isNotFavorite = user.favorites.findIndex((articleExist) => articleExist.id === article.id) === -1;

      if(isNotFavorite) {
        user.favorites.push(article);
        article.favoritesCount++;
        await this.userRepository.save(user);
        await this.articleRepository.save(article);
      }

      return article;
    }

    async deleteArticleFromFavorites(slug: string, userId: number): Promise<ArticleEntity> {
      const article = await this.findBySlug(slug);
      const user = await this.userRepository.findOne({
          where: { id: userId },
          relations: ['favorites']
      })

      const articleIndex = user.favorites.findIndex(
        (articleInFavorites) => articleInFavorites.id === article.id
      );

      if(articleIndex >=0 ) {
        user.favorites.splice(articleIndex, 1);
        article.favoritesCount--;
        await this.userRepository.save(user);
        await this.articleRepository.save(article);
      }

      return article;
    }
}
