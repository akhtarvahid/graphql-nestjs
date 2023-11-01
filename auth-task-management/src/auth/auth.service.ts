import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { AuthCreateInput } from './auth.graphql';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
      @InjectRepository(AuthEntity) 
      private authRepository: Repository<AuthEntity>,
      private jwtService: JwtService
    ) {}

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
      } catch(err) {
        if(err.code === '23505') {
          throw new ConflictException('User already exists');
        } else {
          throw new InternalServerErrorException();
        }
      }
      return signedUser;
    }

    async signInUser(signInput: AuthCreateInput): Promise<{ accessToken: string }> {
      const { username, password } = signInput;
      const user = await this.authRepository.findOne({ username });

      if(user && (await bcrypt.compare(password, user.password))) {
        const payload: JwtPayload = { username };
        const accessToken: string = await this.jwtService.sign(payload);
        return { accessToken };
      } else {
        throw new UnauthorizedException('Please check your login credentials');
      }
    }
}
