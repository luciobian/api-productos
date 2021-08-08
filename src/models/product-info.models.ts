import { Product } from './entities/product.entity';
export default class ProductsInfo {
  name: string;
  description: string;
  price: number;
  totalPrice: number;

  constructor(product: Product) {
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.totalPrice = product.totalPrice;
  }
}
