import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { UserResponseInterface } from '@app/user/types/userResponse.interface';
import { LoginUserDto } from '@app/user/dto/loginUser.dto';
import { ExpressRequest } from './types/expressRequest.interface';
import { User } from './decorators/user.decorator';
import { AuthGuard } from './guards/auth.guard';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService){}
    @Post('users')
    @UsePipes(new ValidationPipe())
    async createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface> {
      const user = await this.userService.createUser(createUserDto);
      return this.userService.buildUserResponse(user);
    }

    @Post('users/login')
    @UsePipes(new ValidationPipe())
    async loginUser(@Body('user') loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
       const user = await this.userService.loginUser(loginUserDto);
       return this.userService.buildUserResponse(user);
    }
    
    @Get('user')
    @UseGuards(AuthGuard)
    async currentUser(@User() user: any): Promise<UserResponseInterface> {
       return this.userService.buildUserResponse(user);
    }
}
