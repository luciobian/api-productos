import { Injectable } from '@nestjs/common';
import { Product } from '../models/entities/product.entity';
import ProductDao from '../daos/product.dao';
import { QueryFilterRequest } from 'src/models/requests/product-controller/query-filter.request';
import { ProductResponse } from '../models/responses/product-controller/product.response';
import HelperConverter from '../helpers/converter.helper';

@Injectable()
export default class ProductService {
  constructor(private _productDao: ProductDao) {}

  async createProduct(product: Product): Promise<number> {
    const response = await this._productDao.createProduct(product);
    return response.id;
  }

  async getProductsFilterByNameOrDescription(filter: QueryFilterRequest): Promise<ProductResponse> {
    let response: Product[] = await this._productDao.getProductsFilterByNameOrDescription(filter);
    if (this.isEmpty(response)) {
      return new ProductResponse([], 0, filter.page | 1);
    }
    return this.formatResponse(response, filter.page | 1);
  }

  async getProductsFilterByDescription(filter: QueryFilterRequest): Promise<ProductResponse> {
    let response: Product[] = await this._productDao.getProductsFilterByDescription(filter);
    if (this.isEmpty(response)) {
      return new ProductResponse([], 0, filter.page | 1);
    }
    return this.formatResponse(response, filter.page | 1);
  }

  async getProductsFilterByName(filter: QueryFilterRequest): Promise<ProductResponse> {
    let response: Product[] = await this._productDao.getProductsFilterByName(filter);
    if (this.isEmpty(response)) {
      return new ProductResponse([], 0, filter.page | 1);
    }
    return this.formatResponse(response, filter.page | 1);
  }

  async getAllProducts(page: number = 1): Promise<ProductResponse> {
    let response: Product[] = await this._productDao.getAllProducts(page);
    if (this.isEmpty(response)) {
      return new ProductResponse([], 0, page);
    }
    return this.formatResponse(response, page);
  }

  private isEmpty(products: Product[]): boolean {
    return products.length === 0;
  }

  private formatResponse(products: Product[], page: number): ProductResponse {
    return HelperConverter.productEntityToResponse(products, page);
  }
}
