import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { InvoiceType } from 'src/invoice/invoice.graphql';

@ObjectType()
export class CustomerType {
  @Field()
  id: string;

  @Field()
  name: string;
  
  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  address: string;

  @Field((type) => [InvoiceType], { nullable: true })
  invoices: InvoiceType[];

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}

@InputType()
export class CreateCustomerInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  address: string;
}
