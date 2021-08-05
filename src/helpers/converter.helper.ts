import { Product } from '../models/entities/product.entity';
import ProductRequest from '../models/requests/product-controller/product.request';

export default class HelperConverter {
  public static productRequestToEntity(
    request: ProductRequest,
    taxValue: number
  ): Product {
    const product = new Product();

    product.name = request.name;
    product.price = request.price;
    product.totalPrice = (taxValue / 100) * request.price + request.price;
    product.description = request.description;
    product.taxId = request.taxId;

    return product;
  }
}
