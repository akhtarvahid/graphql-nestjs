import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { AuthCreateInput } from './auth.graphql';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(AuthEntity) private authRepository: Repository<AuthEntity>) {}

    async createUser(userInput: AuthCreateInput): Promise<void> {
      const { username, password } = userInput;
      const user = this.authRepository.create({
          username,
          password
      })

      await this.authRepository.save(user);
    }
}
