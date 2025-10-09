import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule, Router } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
  ],
  styleUrl: "./login.component.css",
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  cpf: string = "";
  senha: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.cpf, this.senha).subscribe({
      next: (response) => {
        console.log("✅ Dados retornados pelo backend (login OK):", response); // Supondo que o backend retorne algo como { token: '...' }
        this.authService.saveToken(response.token);
        this.router.navigate(["pedidos"]);
      },
      error: (err) => {
        console.log("Tentando login com:", this.cpf, this.senha);
        alert("Usuário ou senha inválidos");
        console.error(err);
      },
    });
  }
  cadastrar() {
    this.router.navigate(["clientes"]);
  }
}
