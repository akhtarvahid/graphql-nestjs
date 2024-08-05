import { AuthGuard } from "@app/user/guards/auth.guard";
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ArticleService } from "./article.service";
import { User } from "@app/user/decorators/user.decorator";
import { CreateArticleDto } from "./dto/createArticle.dto";
import { UserEntity } from "@app/user/user.entity";
import { ArticleResponseInterface } from "./types/ArticleResponse.interface";
import { ArticlesResponseInterface } from "./types/articlesResponse.interface";

@Controller("articles")
export class ArticleController {
  @Inject() articleService: ArticleService;

  // Public get all article API
  @Get()
  async getAllArticle(
    @User("id") currentUserId: number,
    @Query() query: any
  ): Promise<ArticlesResponseInterface> {
    return await this.articleService.findAll(currentUserId, query);
  }

  // Private create API
  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createArticle(
    @User() currentUser: UserEntity,
    @Body("article") createArticleDto: CreateArticleDto
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.create(
      currentUser,
      createArticleDto
    );
    return this.articleService.buildArticleResponse(article);
  }

  // Public get an article API
  @Get(":slug")
  async getArticle(
    @Param("slug") slug: string
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.findBySlug(slug);
    return this.articleService.buildArticleResponse(article);
  }

  // Private delete article API
  @Delete(":slug")
  @UseGuards(AuthGuard)
  async deleteArticle(
    @User("id") currentUserId: number,
    @Param("slug") slug: string
  ) {
    return await this.articleService.delete(slug, currentUserId);
  }

  // Private update article API
  @Put(":slug")
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateArticle(
    @User("id") currentUserId: number,
    @Param("slug") slug: string,
    @Body("article") updateArticleDto: CreateArticleDto
  ) {
    const article = await this.articleService.updateArticle(
      currentUserId,
      slug,
      updateArticleDto
    );
    return await this.articleService.buildArticleResponse(article);
  }

  @Post(":slug/favorite")
  @UseGuards(AuthGuard)
  async articleToFavorites(
    @User("id") currentUserId: number,
    @Param("slug") slug: string
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.addArticleToFavorites(
      slug,
      currentUserId
    );

    return this.articleService.buildArticleResponse(article);
  }

  @Delete(":slug/favorite")
  @UseGuards(AuthGuard)
  async deleteArticleFromFavorites(
    @User("id") currentUserId: number,
    @Param("slug") slug: string
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.deleteArticleFromFavorites(
      slug,
      currentUserId
    );

    return this.articleService.buildArticleResponse(article);
  }
}
