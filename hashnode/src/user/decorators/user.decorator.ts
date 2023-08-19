import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator((_data, ctx: ExecutionContext) => {
      const req = ctx.switchToHttp().getRequest();
      
      if(!req.user) {
        return null;
      }

      if(_data) {
        return req.user[_data]
      }
      return req.user;  
    }
)