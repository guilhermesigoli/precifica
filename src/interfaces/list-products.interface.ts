import { Product } from 'src/database/models/product.model';
export interface IListProducts {
  products: Partial<Product[]>;
  total: number;
}
