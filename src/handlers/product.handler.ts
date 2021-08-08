import { Injectable, NotFoundException } from '@nestjs/common';
import ProductRequest from '../models/requests/product-controller/product.request';
import TaxService from '../services/tax.service';
import ProductService from '../services/product.service';
import HelperConverter from '../helpers/converter.helper';
import { Tax } from '../models/entities/tax.entity';
import { QueryFilterRequest } from '../models/requests/product-controller/query-filter.request';
import { ProductResponse } from '../models/responses/product-controller/product.response';

@Injectable()
export default class ProductHandler {
  constructor(private _taxService: TaxService, private _productService: ProductService) {}
  async createProduct(productRequest: ProductRequest): Promise<number> {
    try {
      const tax: Tax = await this._taxService.getTaxById(productRequest.taxId);
      if (!tax) {
        throw new NotFoundException(`El tipo de impuesto ${productRequest.taxId} no existe.`);
      }

      const product = HelperConverter.productRequestToEntity(productRequest, tax.value);

      const response = await this._productService.createProduct(product);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getProducts(filter: QueryFilterRequest): Promise<ProductResponse> {
    if (filter.name && filter.description) {
      return await this._productService.getProductsFilterByNameOrDescription(filter);
    }

    if (filter.name && !filter.description) {
      return await this._productService.getProductsFilterByName(filter);
    }

    if (!filter.name && filter.description) {
      return await this._productService.getProductsFilterByDescription(filter);
    }

    return await this._productService.getAllProducts(filter.page);
  }
}
