import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Book, CreateBookInput } from './book.graphql';
import { BookService } from './book.service';

Resolver(() => Book);
export class BookResolver {
  private logger = new Logger('BookResolver');

  @Inject() bookService: BookService;

  @Query(() => [Book], { name: 'books' })
  getBooks() {
    return this.bookService.getBooks();
  }

  @Query(() => [Book], { name: 'filterBooks'})
  getFilteredBooks(@Args('searchedText') searchedText: string) {
    return this.bookService.getFilteredBooks(searchedText);
  }

  @Query(() => Book, { name: 'book' })
  getBook(@Args('id') id: string) {
    return this.bookService.getBook(id);
  }

  @Mutation(() => Book)
  createBook(@Args('create') createBookInput: CreateBookInput) {
    try {
      return this.bookService.createBook(createBookInput);
    } catch(error) {
      this.logger.error(`Something went wrong, Response received: ${JSON.stringify(createBookInput)}`)
      throw new InternalServerErrorException();
   }
  }
}
