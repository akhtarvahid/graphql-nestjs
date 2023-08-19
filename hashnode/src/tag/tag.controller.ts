import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagEntity } from './tag.entity';

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Get()
    async findAllTags(): Promise<{tags: string[]}> {
        const tags = await this.tagService.findAll();
        return {
            tags: tags.map(tag => tag.name)
        }
    }
}
