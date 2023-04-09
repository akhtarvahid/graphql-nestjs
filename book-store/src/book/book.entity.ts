import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  id: string;

  @Column()
  book_title: string;

  @Column()
  book_price: string;
}
