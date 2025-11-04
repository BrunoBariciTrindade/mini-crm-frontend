import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule, Router } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { OnInit } from "@angular/core";
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
export class LoginComponent implements OnInit {
  cpf: string = "";
  senha: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.cpf, this.senha).subscribe({
      next: (response) => {
        console.log("✅ Dados retornados pelo backend (login OK):", response); 
        this.authService.saveToken(response.token);
        this.router.navigate(["home"]);
      },
      error: (err) => {
        console.log("Tentando login com:", this.cpf, this.senha);
        alert("Usuário ou senha inválidos");
        console.error(err);
      },
    });
  }
   logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); // se você salvar o id do usuário também
  }
   ngOnInit(): void {
    
    const token = this.authService.getToken();
    if (token) {
      console.log("Usuário ainda logado com token:", token);
     
       this.router.navigate(['home']);
    }
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  cadastrar() {
    this.router.navigate(["clientes"]);
  }
}
