import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType } from '@nestjs/graphql';
import { CustomerEntity } from 'src/customer/customer.entity';

export enum Currency {
  NGN = 'INR',
  USD = 'USD',
  GBP = 'GBP',
  EUR = 'EUR',
}
export enum PaymentStatus {
  PAID = 'PAID',
  NOT_PAID = 'NOT_PAID',
}

@ObjectType()
export class Item {
  @Column()
  description: string;

  @Column()
  rate: number;

  @Column()
  quantity: number;
}

@Entity()
export class InvoiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500, nullable: false })
  invoiceNo: string;

  @Column('text')
  description: string;

  @ManyToOne((type) => CustomerEntity, (customer) => customer.invoices)
  customer: CustomerEntity;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.NOT_PAID,
  })
  paymentStatus: PaymentStatus;

  @Column({
    type: 'enum',
    enum: Currency,
    default: Currency.USD,
  })
  currency: Currency;

  @Column()
  issueDate: string;

  @Column()
  dueDate: string;

  @Column('text')
  note: string;

  @Column({
    type: 'jsonb',
    array: false,
    default: [],
    nullable: false,
  })
  items: Item[];

  @Column()
  total: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
