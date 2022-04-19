import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { CustomerType } from 'src/customer/customer.graphql';

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
  @Field()
  description: string;

  @Field()
  rate: number;

  @Field()
  quantity: number;
}

@ObjectType()
export class InvoiceType {
  @Field()
  id: string;

  @Field()
  invoiceNo: string;

  @Field()
  description: string;

  @Field((type) => CustomerType)
  customer: CustomerType;

  @Field()
  paymentStatus: PaymentStatus;

  @Field()
  currency: Currency;

  @Field()
  issueDate: string;

  @Field()
  dueDate: string;

  @Field()
  note: string;

  @Field((type) => [Item])
  items: Item[];

  @Field()
  total: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
class ItemDTO {
  @Field()
  description: string;

  @Field()
  rate: number;

  @Field()
  quantity: number;
}

@InputType()
export class CreateInvoiceInput {
  @Field()
  customer: string;

  @Field()
  invoiceNo: string;

  @Field()
  paymentStatus: PaymentStatus;

  @Field()
  description: string;

  @Field()
  currency: Currency;

  @Field()
  issueDate: Date;

  @Field()
  dueDate: Date;

  @Field()
  note: string;

  @Field((type) => [ItemDTO])
  items: ItemDTO[];
}
