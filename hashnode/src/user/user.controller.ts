import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { UserResponseInterface } from '@app/user/types/userResponse.interface';
import { LoginUserDto, UserCredentialsDto } from '@app/user/dto/loginUser.dto';
import { ExpressRequest } from './types/expressRequest.interface';
import { User } from './decorators/user.decorator';
import { AuthGuard } from './guards/auth.guard';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@Controller()
export class UserController {
    constructor(private readonly userService: UserService){}
    @Post('users')
    @UsePipes(new ValidationPipe())
    async createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface> {
      const user = await this.userService.createUser(createUserDto);
      return this.userService.buildUserResponse(user);
    }

    @Put('user')
    @UseGuards(AuthGuard)
    async updateUser(@User('id') userId: number, @Body('user') updateUserDto: UpdateUserDto): Promise<UserResponseInterface>{
      const user = await this.userService.updateUser(userId, updateUserDto);
      return this.userService.buildUserResponse(user);
    }

    @Post('users/login')
    @ApiBody({ type: LoginUserDto })
    @UsePipes(new ValidationPipe())
    async loginUser(@Body('user') loginUserDto: UserCredentialsDto): Promise<UserResponseInterface> {
       const user = await this.userService.loginUser(loginUserDto);
       return this.userService.buildUserResponse(user);
    }
    
    @Get('user')
    @UseGuards(AuthGuard)
    async currentUser(@User() user: any): Promise<UserResponseInterface> {
       return this.userService.buildUserResponse(user);
    }
}
