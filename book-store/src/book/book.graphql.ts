import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@ObjectType()
export class Book {
  @Field()
  id: string;

  @Field()
  book_title: string;

  @Field()
  book_price: string;
}

@InputType()
export class CreateBookInput {
  @Field()
  @IsNotEmpty()
  @MinLength(1, {
    message: 'Book title is too short',
  })
  book_title: string;

  @Field()
  @IsNotEmpty()
  book_price: string;
}
