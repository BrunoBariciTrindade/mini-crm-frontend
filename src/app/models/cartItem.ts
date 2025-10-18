import { Product } from './product';

export interface CartItem {
  product: Product;  // referência ao produto
  quantity: number;  // quantidade do item
}