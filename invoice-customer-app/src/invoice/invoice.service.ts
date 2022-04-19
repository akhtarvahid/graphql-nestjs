import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerService } from 'src/customer/customer.service';
import { Repository } from 'typeorm';
import { InvoiceEntity } from './invoice.entity';
import { CreateInvoiceInput } from './invoice.graphql';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(InvoiceEntity)
    private invoiceRepository: Repository<InvoiceEntity>,
    private customerService: CustomerService,
  ) {}

  async create(invoice: CreateInvoiceInput): Promise<InvoiceEntity> {
    const customer = await this.customerService.findOne(invoice.customer);
    Logger.log(`Input: ${JSON.stringify(customer)}`);
    const total = invoice.items.reduce((acc, curr) => {
      return acc + Number((curr.rate * curr.quantity).toFixed(2));
    }, 0);

    return this.invoiceRepository.save({
      ...invoice,
      customer,
      total,
    } as any);
  }

  findAll(): Promise<InvoiceEntity[]> {
    return this.invoiceRepository.find();
  }

  findByCustomer(id: string): Promise<InvoiceEntity[]> {
    return this.invoiceRepository
      .createQueryBuilder('invoice')
      .where('invoice.customerId = :id', { id })
      .getMany();
  }

  findOne(id: string): Promise<InvoiceEntity> {
    return this.invoiceRepository.findOne(id);
  }
}
