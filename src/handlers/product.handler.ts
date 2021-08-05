import { Injectable, NotFoundException } from '@nestjs/common';
import ProductRequest from '../models/requests/product-controller/product.request';
import TaxService from '../services/tax.service';
import ProductService from '../services/product.service';
import HelperConverter from '../helpers/converter.helper';
import { Tax } from '../models/entities/tax.entity';

@Injectable()
export default class ProductHandler {
  constructor(
    private _taxService: TaxService,
    private _productService: ProductService
  ) {}
  async createProduct(productRequest: ProductRequest): Promise<number> {
    try {
      const tax: Tax = await this._taxService.getTaxById(productRequest.taxId);
      if (!tax) {
        throw new NotFoundException(
          `El tipo de impuesto ${productRequest.taxId} no existe.`
        );
      }

      const product = HelperConverter.productRequestToEntity(
        productRequest,
        tax.value
      );

      const response = await this._productService.createProduct(product);

      return response;
    } catch (error) {
      throw error;
    }
  }
}
