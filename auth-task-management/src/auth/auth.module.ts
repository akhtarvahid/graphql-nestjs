import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity])],
  providers: [AuthResolver]
})
export class AuthModule {}
