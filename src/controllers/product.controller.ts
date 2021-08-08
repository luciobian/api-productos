import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import HelperFormat from '../helpers/format.helper';
import ProductHandler from '../handlers/product.handler';
import ProductRequest from '../models/requests/product-controller/product.request';
import { QueryFilterRequest } from '../models/requests/product-controller/query-filter.request';

@Controller('products')
export default class ProductController {
  constructor(private _productHandler: ProductHandler) {}

  @Post('')
  @HttpCode(201)
  async createProduct(@Body() productRequest: ProductRequest) {
    const response = await this._productHandler.createProduct(productRequest);
    return HelperFormat.response(response);
  }

  @Get('')
  async getProducts(@Query() filters: QueryFilterRequest) {
    const response = await this._productHandler.getProducts(filters);
    return HelperFormat.response(response);
  }
}
