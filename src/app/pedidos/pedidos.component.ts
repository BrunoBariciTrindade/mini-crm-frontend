import { Pedido } from '../models/pedido.model';
// src/app/features/pedidos/pedidos.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PedidoService } from '../services/pedido.service';




@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule],
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  displayedColumns = ['numero', 'cliente', 'data', 'total', 'status'];
  pedidos: any[] = [];
  private pedidoService = inject(PedidoService);

  ngOnInit(): void {
    this.carregarPedidos();
  }

  carregarPedidos() {
    this.pedidoService.listarPedidos().subscribe({
      next: (dados) => (this.pedidos = dados),
      error: (err) => {
        console.error('Erro ao carregar pedidos', err);
        alert('Erro ao carregar pedidos');
      }
    });
  }
}
