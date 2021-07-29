import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductDao from 'src/daos/product.dao';
import TaxDao from 'src/daos/tax.dao';
import ProductHandler from 'src/handlers/product.handler';
import ProductController from '../../controllers/product.controller';
import ProductService from '../../services/product.service';
import TaxService from '../../services/tax.service';

@Module({
  imports: [TypeOrmModule.forFeature()],
  providers: [ProductDao, ProductHandler, TaxDao, ProductService, TaxService],
  controllers: [ProductController],
  exports: [TypeOrmModule]
})
export class ProductModule {}
