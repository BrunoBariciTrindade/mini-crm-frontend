import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    HttpClientModule
  ],
  templateUrl: './pedidos.component.html'
})
export class PedidosComponent implements OnInit {
  displayedColumns: string[] = ['numero', 'cliente', 'data', 'total', 'status'];
  pedidos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarPedidos();
  }

  carregarPedidos() {
    this.http.get<any[]>('http://localhost:8080/api/pedido/listar')
      .subscribe({
        next: (dados) => {
          this.pedidos = dados;
        },
        error: (err) => {
          console.error('Erro ao carregar pedidos', err);
          alert('Erro ao carregar pedidos');
        }
      });
  }
}
