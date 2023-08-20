import {
    Injectable, 
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
import { ExpressRequest } from '../types/expressRequest.interface';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<ExpressRequest>()
      if (request.user) {
        return true;
      }
      throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    }
  }