import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { ClienteService } from "./cliente.service";
import { Cliente } from "./cliente.model";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { HttpClientModule } from "@angular/common/http";
import { MatSelectModule } from "@angular/material/select";
import { ViewEncapsulation } from "@angular/core";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "app-cliente",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatTableModule,
    HttpClientModule,
    MatSelectModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "pt-BR" }
  ],
  styleUrl: "./cliente.component.css",
  templateUrl: "./cliente.component.html",
})
export class ClienteComponent {
  mostrarPopup = false;
  cpfExiste: boolean = false;
  clienteSelecionado: boolean = false;

  displayedColumns: string[] = [
    "id", "nome", "cpf", "genero", "dataNascimento",
    "email", "telefone", "acoes"
  ];

  cliente: Cliente = this.novoCliente();
  clientes: Cliente[] = [];

  constructor(
    private http: HttpClient,
    private clienteService: ClienteService
  ) {}

  // Cria uma instância limpa de cliente
  private novoCliente(): Cliente {
    return {
      id: 0,
      nome: "",
      cpf: "",
      genero: "",
      dataNascimento: "",
      email: "",
      telefone: "",
      cep: "",
      uf: "",
      endereco: {
        cep: "",
        logradouro: "",
        complemento: "",
        bairro: "",
        uf: "",
        codigoIbge: "",
        cidade: "",
        ddd: "",
        codigoSiafi: "",
      }
      , senha: "", 
       confirmarSenha: "" ,
        userName: ""
    };
  }

  buscarEnderecoPorCep(cep: string) {
    cep = cep.replace(/\D/g, "");

    if (cep.length !== 8) {
      alert("CEP inválido");
      return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    this.http.get<any>(url).subscribe({
      next: (data) => {
        if (data.erro) {
          alert("CEP não encontrado!");
          return;
        }

        this.cliente.endereco = {
          ...this.cliente.endereco,
          cep: data.cep,
          logradouro: data.logradouro,
          complemento: data.complemento,
          bairro: data.bairro,
          cidade: data.localidade,
          uf: data.uf,
          codigoIbge: "",
          ddd: "",
          codigoSiafi: "",
        };

        this.cliente.uf = data.uf;
      },
      error: () => {
        alert("Erro ao buscar CEP.");
      }
    });
  }

  salvarCliente() {
  // 1. Verifica se as senhas são diferentes
  if (this.verificarSenhas()) {
    return;
  }

  if (this.clienteSelecionado) {
    // Atualiza cliente existente
    this.clienteService.atualizar(this.cliente).subscribe(() => {
      alert("Cliente atualizado!");
      this.resetarFormulario();
      this.listarClientes();
    });
  } else {
    // Verifica se CPF já está cadastrado
    this.clienteService.verificarCpfExistente(this.cliente.cpf).subscribe(
      (existe) => {
        if (existe) {
          alert("CPF já cadastrado!");
          return;
        }

        // Cadastra novo cliente
        this.clienteService.cadastrar(this.cliente).subscribe(() => {
          alert("Cliente cadastrado com sucesso!");
          this.ativarChuvaDourada();
          this.resetarFormulario();
          this.listarClientes();

          // Mostra popup de boas-vindas
          this.mostrarPopup = true;
          setTimeout(() => {
            this.mostrarPopup = false;
          }, 4000); // 4 segundos
        });
      },
      (error) => {
        console.error("Erro ao verificar CPF:", error);
        alert("Erro ao verificar CPF.");
      }
    );
  }
}
private verificarSenhas(): boolean {
    if (this.cliente.senha !== this.cliente.confirmarSenha) {
      alert('As senhas não coincidem!');
      return true;
    }
    return false;
  }



  // Ativa chuva dourada
  private ativarChuvaDourada() {
    const rain = document.getElementById('goldRain');
if (rain) {
  rain.innerHTML = ''; // Limpa partículas antigas
  for (let i = 0; i < 80; i++) {
    const particula = document.createElement('div');
    particula.classList.add('particula');
    particula.style.left = Math.random() * 100 + 'vw';
    particula.style.animationDuration = (Math.random() * 2 + 3) + 's';
    rain.appendChild(particula);
  }

  rain.style.display = 'block';

  // Oculta e limpa após 4 segundos
  setTimeout(() => {
    rain.style.display = 'none';
    rain.innerHTML = '';
  }, 10000); // 10 segundos
}

  }

  listarClientes() {
    this.clienteService.listar().subscribe((data) => {
      this.clientes = data;
    });
  }

  editarCliente(cliente: Cliente) {
    this.cliente = { ...cliente };
    this.clienteSelecionado = true;
  }

  excluirCliente(clienteId: number) {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
      this.clienteService.excluir(clienteId).subscribe(
        () => {
          alert("Cliente excluído com sucesso!");
          this.listarClientes();
        },
        (error) => {
          alert("Erro ao excluir cliente.");
          console.error(error);
        }
      );
    }
  }

  verificarCpfExistente(cpf: string) {
    if (!cpf) return;

    this.clienteService.verificarCpfExistente(cpf).subscribe(
      (existe) => {
        if (existe) {
          alert("Este CPF já está cadastrado!");
        }
      },
      (error) => {
        console.error("Erro ao verificar CPF", error);
      }
    );
  }

  resetarFormulario() {
    this.cliente = this.novoCliente();
    this.clienteSelecionado = false;
  }
}
