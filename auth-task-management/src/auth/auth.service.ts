import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { AuthCreateInput } from './auth.graphql';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(AuthEntity) private authRepository: Repository<AuthEntity>) {}

    async createUser(userInput: AuthCreateInput): Promise<AuthEntity> {
      const { username, password } = userInput;
      let user;
      try {
        user = this.authRepository.create({
          username,
          password
       })
       await this.authRepository.save(user);
      }catch(err) {
        if(err.code === '23505') {
          throw new ConflictException('User already exists');
        } else {
          throw new InternalServerErrorException();
        }
      }
      return user;
    }
}
