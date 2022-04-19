import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './customer/customer.entity';
import { CustomerModule } from './customer/customer.module';
import { InvoiceEntity } from './invoice/invoice.entity';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 7070,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      entities: [CustomerEntity, InvoiceEntity],
      //entities: ['dist/**/*.entity.js'], // or  => [CustomerEntity, InvoiceEntity]
      synchronize: true,
    }),
    InvoiceModule,
    CustomerModule,
  ],
})
export class AppModule {}
