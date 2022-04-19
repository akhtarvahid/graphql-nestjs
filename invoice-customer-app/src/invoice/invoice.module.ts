import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { CustomerModule } from 'src/customer/customer.module';
import { InvoiceResolver } from './invoice.resolver';
import { InvoiceService } from './invoice.service';
import { InvoiceEntity } from './invoice.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceEntity]),
    forwardRef(() => CustomerModule),
  ],
  providers: [InvoiceService, InvoiceResolver],
  exports: [InvoiceService],
})
export class InvoiceModule {}
