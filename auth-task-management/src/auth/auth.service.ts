import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(AuthEntity) private authRepository: Repository<AuthEntity>) {}

    async createUser(username, password): Promise<AuthEntity> {
      const user = this.authRepository.create({
          username,
          password
      })

      await this.authRepository.save(user);

      return user
    }
}
