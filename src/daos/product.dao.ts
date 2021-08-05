import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../models/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class ProductDao {
  constructor(
    @InjectRepository(Product)
    private _productRepository: Repository<Product>
  ) {}

  async createProduct(product: Product): Promise<Product> {
    return await this._productRepository.save(product);
  }
}
