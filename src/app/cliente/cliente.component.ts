import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ClienteService } from './cliente.service';
import { Cliente, Endereco } from './cliente.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule,MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { ViewEncapsulation } from '@angular/core';
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule,
    MatFormFieldModule,MatCardModule ,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,MatTableModule,
    HttpClientModule,MatSelectModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },  // <-- Aqui define o locale para pt-BR
  ],

  templateUrl: './cliente.component.html'
})
export class ClienteComponent {
  cpfExiste: boolean = false;
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'genero', 'dataNascimento', 'email', 'telefone', 'acoes'];
  cliente: Cliente = {
  id: 0,
    nome: '',
  cpf: '',
  genero: '',
  dataNascimento: '',
  email: '',
  telefone: '',
  cep: '',
  uf: '',
  endereco: {
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    uf: '',
    codigoIbge: '',
    cidade: '',
    ddd: '',
    codigoSiafi: ''
  }
    };
  clientes: Cliente[] = [];
  clienteSelecionado: boolean = false;

  constructor(
    private http: HttpClient,
    private clienteService: ClienteService
  ) {}



  buscarEnderecoPorCep(cep: string) {
  cep = cep.replace(/\D/g, '');

  if (cep.length !== 8) {
    alert('CEP inválido');
    return;
  }

  const url = `https://viacep.com.br/ws/${cep}/json/`;

  this.http.get<any>(url).subscribe({
    next: (data) => {
      if (data.erro) {
        alert('CEP não encontrado!');
        return;
      }

      // Preencher os campos do endereço
      this.cliente.endereco.cep = data.cep;
      this.cliente.endereco.logradouro = data.logradouro;
      this.cliente.endereco.complemento = data.complemento;
      this.cliente.endereco.bairro = data.bairro;
      this.cliente.endereco.cidade = data.localidade;
      this.cliente.endereco.uf = data.uf;

      // (Opcional) Atualizar o campo UF principal se quiser sincronizar
      this.cliente.uf = data.uf;
    },
    error: (err) => {
      console.error('Erro ao buscar CEP:', err);
      alert('Erro ao buscar CEP.');
    }
  });
}

  salvarCliente() {
  console.log('Cliente enviado:', this.cliente);

  if (this.clienteSelecionado) {
    // Atualiza cliente existente
    this.clienteService.atualizar(this.cliente).subscribe(() => {
      alert('Cliente atualizado!');
      this.resetarFormulario();
      this.listarClientes();
    });
  } else {
    // Verifica se CPF já existe antes de cadastrar
    this.clienteService.verificarCpfExistente(this.cliente.cpf).subscribe(existe => {
      if (existe) {
        alert('CPF já cadastrado!');
      } else {
        // Só cadastra se CPF não existir
        this.clienteService.cadastrar(this.cliente).subscribe(() => {
          alert('Cliente cadastrado!');
          this.resetarFormulario();
          this.listarClientes();
        });
      }
    }, error => {
      console.error('Erro ao verificar CPF:', error);
      alert('Erro ao verificar CPF');
    });
  }
}


  listarClientes() {
    this.clienteService.listar().subscribe(data => {
      this.clientes = data;
    });
  }

  editarCliente(cliente: Cliente) {
  this.cliente = { ...cliente }; // copia os dados do cliente para o objeto do formulário
  this.clienteSelecionado = true; // indica que está em modo edição
}
excluirCliente(clienteId: number) {
  if (confirm('Tem certeza que deseja excluir este cliente?')) {
    this.clienteService.excluir(clienteId).subscribe(() => {
      alert('Cliente excluído com sucesso!');
      this.listarClientes();  // Atualiza a lista após exclusão
    }, error => {
      alert('Erro ao excluir cliente!');
      console.error(error);
    });
  }
}

verificarCpfExistente(cpf: string) {
  if (!cpf) return; // evita chamadas com CPF vazio

  this.clienteService.verificarCpfExistente(cpf).subscribe(existe => {
    if (existe) {
      alert('Este CPF já está cadastrado!');
    }
  }, error => {
    console.error('Erro ao verificar CPF', error);
  });
}


  resetarFormulario() {
    this.cliente = {  id: 0,
  nome: '',
  cpf: '',
  genero: '',
  dataNascimento: '',
  email: '',
  telefone: '',
  cep: '',
  uf: '',
  endereco: {
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    uf: '',
    codigoIbge: '',
    cidade: '',
    ddd: '',
    codigoSiafi: ''
  }
};
    this.clienteSelecionado = false;

  }
}
