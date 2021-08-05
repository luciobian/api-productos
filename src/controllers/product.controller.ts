import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import HelperFormat from '../helpers/format.helper';
import ProductHandler from '../handlers/product.handler';
import ProductRequest from '../models/requests/product-controller/product.request';

@Controller('products')
export default class ProductController {
  constructor(private _productHandler: ProductHandler) {}

  @Post('')
  @HttpCode(201)
  async createProduct(@Body() productRequest: ProductRequest) {
    const response = await this._productHandler.createProduct(productRequest);
    return HelperFormat.response(response);
  }
}
