import { Product } from '../models/entities/product.entity';
import ProductRequest from '../models/requests/product-controller/product.request';
import { ProductResponse } from '../models/responses/product-controller/product.response';
import ProductsInfo from '../models/product-info.models';
import { User } from '../models/entities/user.entity';
import LoginResponse from '../models/responses/user-controller/login.response';
import RegisterRequest from '../models/requests/user-controller/register.request';
import HelperToken from './token.helper';
import RegisterResponse from '../models/responses/user-controller/register.response';

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

  public static loginResponse(user: User): LoginResponse {
    const response = new LoginResponse();
    response.token = user.token;
    return response;
  }

  public static registerResponse(user: User): RegisterResponse {
    const response = new RegisterResponse();
    response.token = user.token;
    return response;
  }

  public static registerRequestToUser(registerRequest: RegisterRequest): User {
    let user = new User();
    user.email = registerRequest.email;
    user.password = registerRequest.password;
    user.token = HelperToken.generateToken();
    user.roleId = 1;
    return user;
  }
}
