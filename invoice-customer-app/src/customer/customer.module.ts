import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';
import { InvoiceModule } from 'src/invoice/invoice.module';
import { CustomerEntity } from './customer.entity';

@Module({
  imports: [
    forwardRef(() => InvoiceModule),
    TypeOrmModule.forFeature([CustomerEntity]),
  ],
  providers: [CustomerService, CustomerResolver],
  exports: [CustomerService],
})
export class CustomerModule {}
