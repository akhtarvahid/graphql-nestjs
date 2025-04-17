import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateArticleDto {
    @IsNotEmpty()
    @ApiProperty({
        type: 'string',
        example: 'Title of blog'
    })
    readonly title: string;

    @IsNotEmpty()
    @ApiProperty({
        type: 'string',
        example: 'Shot description of blog'
    })
    readonly description: string;

    @IsNotEmpty()
    @ApiProperty({
        type: 'string',
        example: 'Detail about the blog'
    })
    readonly body: string;

    @ApiProperty({
        type: 'string',
        example: ['blogTag1']
    })
    readonly tagList: string[]
}

export class ArticleDto {
    @IsNotEmpty()
    @ApiProperty({
        type: CreateArticleDto
    })
    readonly article: CreateArticleDto;
}