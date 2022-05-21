import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthType } from './auth.graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
    @Inject() authService: AuthService;

    @Mutation(_=> AuthType)
    create(@Args('username') username: string, @Args('password') password: string)  {
        return this.authService.createUser(username, password);
    }
}
