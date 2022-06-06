import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'src/schema.gql',
      driver: ApolloDriver,
      context: ({ req }) => ({ headers: req.headers })
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3003,
      username: 'postgres',
      password: 'password',
      database: 'tasks-db',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    TasksModule,
    AuthModule
  ],
})
export class AppModule {}
