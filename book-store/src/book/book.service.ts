import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './book.entity';
import { CreateBookInput } from './book.graphql';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {}
  async getBooks(): Promise<BookEntity[]> {
    return this.bookRepository.find();
  }
  async getFilteredBooks(text: string): Promise<any> {
    const books = await this.bookRepository.find();
    const filteredBooks = books.filter(book => book.book_title.toLocaleLowerCase().includes(text.toLocaleLowerCase()));
    console.log(filteredBooks);
    return filteredBooks;
  }
  async getBook(id: string): Promise<BookEntity> {
    return this.bookRepository.findOne({id})
  }

  async createBook(
    createBookInput: CreateBookInput,
  ): Promise<BookEntity> {
    const book = this.bookRepository.create({
      id: uuid(),
      ...createBookInput,
    });
      return this.bookRepository.save(book);
  }
}
