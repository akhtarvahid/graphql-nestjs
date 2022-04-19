import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CustomerService } from 'src/customer/customer.service';
import { CreateInvoiceInput, InvoiceType } from './invoice.graphql';
import { CustomerType } from 'src/customer/customer.graphql';

@Resolver((of) => InvoiceType)
export class InvoiceResolver {
  constructor(
    @Inject(InvoiceService) private invoiceService: InvoiceService,
    @Inject(CustomerService) private customerService: CustomerService,
  ) {}
  @Query((returns) => InvoiceType)
  async invoice(@Args('id') id: string): Promise<InvoiceType> {
    return await this.invoiceService.findOne(id);
  }

  @ResolveField((returns) => CustomerType)
  async customer(@Parent() invoice: InvoiceType) {
    const { customer } = invoice;
    return this.customerService.findOne(customer.id);
  }

  @Query((returns) => [InvoiceType])
  async invoices() {
    return await this.invoiceService.findAll();
  }

  @Mutation((returns) => InvoiceType)
  async createInvoice(
    @Args('invoice') invoice: CreateInvoiceInput,
  ): Promise<InvoiceType> {
    return await this.invoiceService.create(invoice);
  }
}
