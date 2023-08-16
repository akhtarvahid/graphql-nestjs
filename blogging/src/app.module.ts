import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { BlogModule } from './blog/blog.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from './blog/blog.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/blogging',
      synchronize: true,
      useUnifiedTopology: true,
      port: 28017,
      entities: [BlogEntity],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
      driver: ApolloDriver,
    }),
    BlogModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
