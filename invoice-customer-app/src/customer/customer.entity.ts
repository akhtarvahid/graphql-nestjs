import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { InvoiceEntity } from 'src/invoice/invoice.entity';

@Entity()
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 500, nullable: false })
  name: string;
  @Column('text', { nullable: false })
  email: string;
  @Column('varchar', { length: 15 })
  phone: string;
  @Column('text')
  address: string;

  @OneToMany((type) => InvoiceEntity, (invoice) => invoice.customer)
  invoices: InvoiceEntity[];

  @Column()
  @CreateDateColumn()
  created_at: Date;
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
