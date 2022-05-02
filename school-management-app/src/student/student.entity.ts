import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class StudentEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  contactNo: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  nationality: string;
}
