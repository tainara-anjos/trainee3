// O ProdutoService é responsável por se comunicar com a API. Ele centraliza todas as chamadas HTTP para listar, criar, editar e deletar produtos.

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../interfaces/Produtos';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private BASE_URL: string = 'http://localhost:3000/produtos'; //Aqui eu armazeno a URL base da API, para não precisar repetir em cada método.

  constructor(private http: HttpClient) { }

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.BASE_URL}`);
  }

  getProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.BASE_URL}/${id}`);
  }

  createProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.BASE_URL}`, produto);
  }

  deleteProduto(id: number): Observable<Produto> {
    return this.http.delete<Produto>(`${this.BASE_URL}/${id}`);
  }

  updateProduto(id: number, produto: Produto): Observable<Produto> {
    return this.http.patch<Produto>(`${this.BASE_URL}/${id}`, produto);
  }
}