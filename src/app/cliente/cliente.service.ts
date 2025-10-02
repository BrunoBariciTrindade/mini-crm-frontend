import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from './cliente.model';

import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/api/cliente';

  constructor(private http: HttpClient) {}

  // GET: Listar todos os clientes
  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/listar`);
  }

  // POST: Cadastrar novo cliente
  cadastrar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/cadastrar`, cliente);
  }

  // PUT: Atualizar cliente
  atualizar(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${cliente.id}`, cliente);
  }

  // DELETE: Excluir cliente
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // GET (opcional): Buscar cliente por ID
  buscarPorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }
   verificarCpfExistente(cpf: string): Observable<boolean> {
  return this.http.get<boolean>(`http://localhost:8080/api/cliente/exists?cpf=${cpf}`);
}




}
