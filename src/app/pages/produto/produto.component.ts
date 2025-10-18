import { CartService } from './../../services/cart.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
interface Produto {
  id: number;
  nome: string;
  imagem: string;
  descricao: string;
  price: number;
}


@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent {
  constructor(private router: Router,private cartService : CartService) {}
   produtos: Produto[] = [
    {
      id: 1,
      nome: 'Produto 1',
      imagem: 'brancadeneve.jpg',
      descricao: 'Descrição do produto 1.',
      price: 50
    },
    {
      id: 2,
      nome: 'Produto 2',
      imagem: 'davi.jpg',
      descricao: 'Descrição do produto 2.',
      price: 75
    },
    {
      id: 3,
      nome: 'Produto 3',
      imagem: 'brancadeneve.jpg',
      descricao: 'Descrição do produto 3.',
      price: 90
    }
  ];
  
  getImagem(nomeImagem: string): string {
  return `${nomeImagem}`; 


}
 adicionarAoCarrinho(produto: any) {
  
  this.cartService.adicionarProduto(produto);   
  console.log('Produto adicionado:', produto);

    // Redireciona para a página do carrinho
    this.router.navigate(['/cart']);
  }
}