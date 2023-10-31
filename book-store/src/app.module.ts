import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './book/book.entity';
import { BookModule } from './book/book.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 7070,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      synchronize: true,
      entities: [BookEntity],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/book-schema.gql',
      playground: true
    }),
    BookModule,
  ],
})
export class AppModule {}
