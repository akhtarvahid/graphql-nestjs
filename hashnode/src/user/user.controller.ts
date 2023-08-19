import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { UserResponseInterface } from '@app/user/types/userResponse.interface';
import { LoginUserDto } from '@app/user/dto/loginUser.dto';

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
}
