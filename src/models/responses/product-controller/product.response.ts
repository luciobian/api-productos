import ProductsInfo from '../../product-info.models';
export class ProductResponse {
  products: ProductsInfo[];
  page: number;
  total: number;

  constructor(product: ProductsInfo[], total: number, page: number) {
    this.products = product;
    this.page = Number(page);
    this.total = total;
  }
}
