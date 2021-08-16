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
import { AuthModule } from '../auth/auth.module';
import { AuthAdminGuard } from '../../helpers/guards/authorization.guard';
import AuthAdminService from '../../../src/services/auth.service';
import UserDao from '../../../src/daos/user.dao';
import { User } from '../../../src/models/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Tax, User]), AuthModule],
  providers: [ProductDao, ProductHandler, TaxDao, ProductService, TaxService, AuthAdminGuard, AuthAdminService, UserDao],
  controllers: [ProductController],
  exports: [TypeOrmModule]
})
export class ProductModule {}
