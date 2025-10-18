
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { CartItem } from '../models/cartItem.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: CartItem[] = [];
constructor(private http: HttpClient) {}
  getCartItems(): CartItem[] {
    return this.items;
  }

adicionarProduto(product: Product) {
  const existingItem = this.items.find(i => i.product.id === product.id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    const newItem: CartItem = { product, quantity: 1 };
    this.items.push(newItem);
  }

  // Envia também para o backend
  this.http.post('http://localhost:8080/api/cart/adicionar', { product, quantity: 1 })
    .subscribe({
      next: () => console.log('Item adicionado ao backend'),
      error: (err) => console.error('Erro ao adicionar item:', err)
    });
}


  atualizarQuantidade(product: Product, quantity: number) {
    const item = this.items.find(i => i.product.id === product.id);
    if (item) item.quantity = quantity;
  }

  removerProduto(product: Product) {
    this.items = this.items.filter(i => i.product.id !== product.id);
  }

  getTotal(): number {
    return this.items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  }
  getCartItemsFromBackend() {
  return this.http.get<CartItem[]>('http://localhost:8080/api/cart');
  }
  limparCarrinho() {
    this.items = [];
  }
}
