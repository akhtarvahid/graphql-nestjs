import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { AuthCreateInput } from './auth.graphql';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(AuthEntity) private authRepository: Repository<AuthEntity>) {}

    async createUser(userInput: AuthCreateInput): Promise<AuthEntity> {
      let signedUser;
      const { username, password } = userInput;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      try {
        signedUser = this.authRepository.create({
          username,
          password: hashedPassword
       })
       await this.authRepository.save(signedUser);
      }catch(err) {
        if(err.code === '23505') {
          throw new ConflictException('User already exists');
        } else {
          throw new InternalServerErrorException();
        }
      }
      return signedUser;
    }
}
