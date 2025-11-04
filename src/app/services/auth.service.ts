import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(cpf: string, senha: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, {
      cpf,
      senha
    });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
     isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token; 
  }
}
