import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { ExpressRequest } from "../types/expressRequest.interface";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "@app/config";
import { UserService } from "../user.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) {}
    async use(req: ExpressRequest, _: Response, next: NextFunction) {
      if(!req.headers.authorization) {
        req.user = null;
        next();
        return;
      }
      
      const token = req.headers.authorization.split(' ')[1];
      try {
        const decode = verify(token, JWT_SECRET);
        const user = await this.userService.getUserById(decode.id);
        req.user = user;
        console.log(decode)
        next();
      } catch(e) {
        req.user = null;
        next();
      }
    }
}