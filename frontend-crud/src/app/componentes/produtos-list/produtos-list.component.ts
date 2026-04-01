// Esse componente é responsável por buscar e listar os produtos vindos da API.

import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/interfaces/Produtos';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produtos-list',
  templateUrl: './produtos-list.component.html',
  styleUrls: ['./produtos-list.component.scss']
})
export class ProdutosListComponent implements OnInit {

  produtos: Produto[] = []; //Aqui eu armazeno a lista de produtos que vem do backend.

  constructor(private produtoService: ProdutoService) {}

  ngOnInit() {
    this.getProdutos();
  }

  getProdutos() {
    this.produtoService.getProdutos()
      .subscribe((res: Produto[]) => {
        this.produtos = res.map(p => ({
          id: p.id,
          nome: p.nome,
          preco: p.preco,
           descricao: p.descricao,
           categoria: p.categoria,
          disponivel: p.disponivel
      
        }));
      }, err => console.log(err));
  }

  deleteProduto(id: number) {
    this.produtoService.deleteProduto(id)
      .subscribe(
        res => {
          this.getProdutos(); 
        },
        err => console.log(err)  
      );
  }
}