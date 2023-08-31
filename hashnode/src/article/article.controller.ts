import { AuthGuard } from '@app/user/guards/auth.guard';
import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('articles')
export class ArticleController {

    @Inject() articleService: ArticleService;

    @Post()
    @UseGuards(AuthGuard)
    async createArticle(@Body('article') article: any) {
        return this.articleService.create(article);
    }
}
