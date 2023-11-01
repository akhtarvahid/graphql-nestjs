import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { UserResponseInterface } from '@app/user/types/userResponse.interface';
import { LoginUserDto } from './dto/loginUser.dto';
import { compare } from 'bcrypt';
import { UpdateUserDto } from './dto/updateUser.dto';
@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity> ){}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const userFoundByEmail = await this.userRepository.findOne({
            where: {
                email: createUserDto.email
            }
        })
        const userFoundByUsername = await this.userRepository.findOne({
            where: {
                username: createUserDto.username
            }
        })
        if(userFoundByEmail || userFoundByUsername) {
           throw new HttpException('Email or username already exist', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const newUser = new UserEntity();
        Object.assign(newUser, createUserDto);
        return await this.userRepository.save(newUser);
    }

    async updateUser(userId: number, updateUserDto: UpdateUserDto){
        const user = await this.getUserById(userId);
        Object.assign(user, updateUserDto);
        return await this.userRepository.save(user);
    }

    async getUserById(id: number): Promise<UserEntity> {
      return this.userRepository.findOne({
        where: {
            id
        }
      })
    }

    generateJwt(user: UserEntity): string {
       return sign({
         id: user.id,
         username: user.username,
         email: user.email
       }, JWT_SECRET, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) })
    }
    buildUserResponse(user: UserEntity): UserResponseInterface {
      return {
        user: {
            ...user,
            token : this.generateJwt(user)
        },
      };
    }

    async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                email: loginUserDto.email
            },
            select: ['id', 'username', 'email', 'image', 'bio', 'password']
        })
        if(!user) {
            throw new HttpException('Credentials are not valid', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const isPasswordCorrect = await compare(loginUserDto.password, user.password);
        if(!isPasswordCorrect) {
            throw new HttpException('Credentials are not valid', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        delete user.password;
        return user;
    }
}
