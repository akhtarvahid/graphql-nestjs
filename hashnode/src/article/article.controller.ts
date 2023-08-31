import { AuthGuard } from '@app/user/guards/auth.guard';
import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { User } from '@app/user/decorators/user.decorator';
import { CreateArticleDto } from './dto/createArticle.dto';
import { UserEntity } from '@app/user/user.entity';

@Controller('articles')
export class ArticleController {

    @Inject() articleService: ArticleService;

    @Post()
    @UseGuards(AuthGuard)
    async createArticle(
        @User() currentUser: UserEntity, 
        @Body('article') createArticleDto: CreateArticleDto
    ): Promise<any> {
        return this.articleService.create(currentUser, createArticleDto);
    }
}
