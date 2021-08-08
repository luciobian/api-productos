import { Product } from '../models/entities/product.entity';
import ProductRequest from '../models/requests/product-controller/product.request';
import { ProductResponse } from '../models/responses/product-controller/product.response';
import ProductsInfo from '../models/product-info.models';

export default class HelperConverter {
  public static productRequestToEntity(request: ProductRequest, taxValue: number): Product {
    const product = new Product();

    product.name = request.name;
    product.price = request.price;
    product.totalPrice = (taxValue / 100) * request.price + request.price;
    product.description = request.description;
    product.taxId = request.taxId;

    return product;
  }

  public static productEntityToResponse(product: Product[], page: number): ProductResponse {
    let productsInfoArray: ProductsInfo[] = [];
    let total = product.length;
    for (let i = 0; i < product.length; i++) {
      productsInfoArray.push(new ProductsInfo(product[i]));
    }
    return new ProductResponse(productsInfoArray, total, page);
  }
}
