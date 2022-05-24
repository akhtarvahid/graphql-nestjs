import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthCreateInput, AuthType } from './auth.graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
    @Inject() authService: AuthService;

    @Mutation(_=> AuthType)
    signUp(@Args('signUp') signUpUser: AuthCreateInput)  {
        this.authService.createUser(signUpUser);
    }
}
