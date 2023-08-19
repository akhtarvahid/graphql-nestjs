import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {

    async findAll() {
        return ['React', 'Js'];
    }
}
