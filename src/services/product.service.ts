import { Injectable } from '@nestjs/common';
import { Product } from '../models/entities/product.entity';
import ProductDao from '../daos/product.dao';

@Injectable()
export default class ProductService {
  constructor(private _productDao: ProductDao) {}

  async createProduct(product: Product): Promise<number> {
    const response = await this._productDao.createProduct(product);
    return response.id;
  }
}
