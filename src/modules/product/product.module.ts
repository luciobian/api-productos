import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductDao from '../../daos/product.dao';
import TaxDao from '../../daos/tax.dao';
import ProductHandler from '../../handlers/product.handler';
import { Product } from '../../models/entities/product.entity';
import { Tax } from '../../models/entities/tax.entity';
import ProductController from '../../controllers/product.controller';
import ProductService from '../../services/product.service';
import TaxService from '../../services/tax.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Tax])],
  providers: [ProductDao, ProductHandler, TaxDao, ProductService, TaxService],
  controllers: [ProductController],
  exports: [TypeOrmModule]
})
export class ProductModule {}
