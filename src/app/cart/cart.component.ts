// src/app/features/carrinho/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CartItem } from '../models/cartItem.model';
import { Product } from '../models/product.model';
import { PedidoService } from '../services/pedido.service';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private router: Router,
    private cartService: CartService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit() {
  this.cartService.getCartItemsFromBackend().subscribe(items => {
    this.cartItems = items;
  });
}

  update(product: Product, quantity: number) {
    if (quantity < 1) quantity = 1;
    this.cartService.atualizarQuantidade(product, quantity);
    this.cartItems = this.cartService.getCartItems();
  }

  remove(product: Product) {
    this.cartService.removerProduto(product);
    this.cartItems = this.cartService.getCartItems();
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  checkout() {
  const pedido = {
    clienteId: 1,
    itens: this.cartItems.map(item => ({
      product: item.product,
      quantity: item.quantity
    })),
    total: this.getTotal()
  };

  this.pedidoService.enviarPedido(pedido).subscribe({
    next: () => {
      alert('Pedido enviado com sucesso!');
      this.cartService.limparCarrinho();
      this.router.navigate(['/pedidos']);
    },
    error: (err) => {
      console.error('Erro ao enviar pedido', err);
      alert('Erro ao finalizar pedido');
    }
  });
}

}
