import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { InvoiceService } from 'src/invoice/invoice.service';
import { InvoiceType } from 'src/invoice/invoice.graphql';
import { CreateCustomerInput, CustomerType } from './customer.graphql';

@Resolver((of) => CustomerType)
export class CustomerResolver {
  constructor(
    @Inject(CustomerService) private customerService: CustomerService,
    @Inject(InvoiceService) private invoiceService: InvoiceService,
  ) {}
  @Query((returns) => CustomerType)
  async customer(@Args('id') id: string): Promise<CustomerType> {
    return await this.customerService.findOne(id);
  }

  @ResolveField((returns) => [InvoiceType])
  async invoices(@Parent() customer: CustomerType) {
    const { id } = customer;
    return this.invoiceService.findByCustomer(id);
  }

  @Query((returns) => [CustomerType])
  async customers(): Promise<CustomerType[]> {
    return await this.customerService.findAll();
  }

  @Mutation((returns) => CustomerType)
  async createCustomer(
    @Args('create') createCustomerInput: CreateCustomerInput,
  ): Promise<CustomerType> {
    const { name, email, phone, address } = createCustomerInput;
    return await this.customerService.create({ name, email, phone, address });
  }
}
