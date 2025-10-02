import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CartItem } from './models/cartItem.model';
import { Product } from './models/product.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  imports: [CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
 cartItems: CartItem[] = [];
  cartCount = 0;
 constructor(private router : Router) {}
  ngOnInit() {
    // Simulando resposta do backend
    this.cartItems = [
      {
        product: {
          id: 1,
          name: 'Tênis Esportivo',
          price: 299.99,
          image: 'https://angular.io/assets/images/logos/angular/angular.png', // troque pela url correta
        },
        quantity: 2,
      },
      {
        product: {
          id: 2,
          name: 'Camiseta Básica',
          price: 49.9,
          image: 'https://angular.io/assets/images/logos/angular/angular_solidBlack.png', // troque pela url correta
        },
        quantity: 1,
      },
    ];
  }

  addToCart(product: Product) {
    // Aqui você adiciona o produto ao carrinho
    console.log('Produto adicionado:', product);

    // Exemplo simples: só incrementa o contador
    this.cartCount++;
}
  update(product: Product, quantity: number) {
    if (quantity < 1) {
      quantity = 1;
    }
    const item = this.cartItems.find(i => i.product.id === product.id);
    if (item) {
      item.quantity = quantity;
    }
  }

  remove(product: Product) {
    this.cartItems = this.cartItems.filter(i => i.product.id !== product.id);
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  checkout() {
    alert(`Total do pedido: ${this.getTotal().toFixed(2)}`);
     this.router.navigate(['login']);
  }
}
