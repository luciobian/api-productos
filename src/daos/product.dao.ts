import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../models/entities/product.entity';
import { Like, Repository } from 'typeorm';
import { QueryFilterRequest } from '../models/requests/product-controller/query-filter.request';
import Constant from '../helpers/constant.helper';

@Injectable()
export default class ProductDao {
  constructor(
    @InjectRepository(Product)
    private _productRepository: Repository<Product>
  ) {}

  async createProduct(product: Product): Promise<Product> {
    return await this._productRepository.save(product);
  }

  async getProductsFilterByNameOrDescription(filter: QueryFilterRequest): Promise<Product[]> {
    return await this._productRepository.find({
      where: { name: Like(`%${filter.name}%`), description: Like(`%${filter.description}%`), enabled: true },
      order: { updatedAt: Constant.DESC },
      take: Constant.PER_PAGE,
      skip: (filter.page - 1) * Constant.PER_PAGE
    });
  }

  async getProductsFilterByDescription(filter: QueryFilterRequest): Promise<Product[]> {
    return await this._productRepository.find({
      where: { description: Like(`%${filter.description}%`), enabled: true },
      order: { updatedAt: Constant.DESC },
      take: Constant.PER_PAGE,
      skip: (filter.page - 1) * Constant.PER_PAGE
    });
  }

  async getProductsFilterByName(filter: QueryFilterRequest): Promise<Product[]> {
    return await this._productRepository.find({
      where: { name: Like(`%${filter.name}%`), enabled: true },
      order: { updatedAt: Constant.DESC },
      take: Constant.PER_PAGE,
      skip: (filter.page - 1) * Constant.PER_PAGE
    });
  }

  async getAllProducts(page: number): Promise<Product[]> {
    return await this._productRepository.find({
      order: { updatedAt: Constant.DESC },
      take: Constant.PER_PAGE,
      skip: (page - 1) * Constant.PER_PAGE
    });
  }
}
