//Esse componente é responsável pelo formulário de criação e edição de produtos, integrado com a API.

import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/interfaces/Produtos';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-produtos-form',
  templateUrl: './produtos-form.component.html',
  styleUrls: ['./produtos-form.component.scss']
})
export class ProdutosFormComponent implements OnInit {

  produto: Produto = { id: 0, nome: '', preco: 0, descricao: '', categoria: '', disponivel: true };

  //  variáveis para mensagens
  mensagem: string = '';
  erroNome: string = '';
  erroPreco: string = '';

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.produtoService.getProduto(+id).subscribe((p: Produto) => {
        this.produto = p;
      });
    }
  }

  submitProdutos() {
    // limpa mensagens
    this.erroNome = '';
    this.erroPreco = '';
    this.mensagem = '';

    let valido = true;

    // valida nome
    if (!this.produto.nome || this.produto.nome.trim() === '') {
      this.erroNome = 'O nome é obrigatório';
      valido = false;
    }

    // valida preço
    if (this.produto.preco < 0) {
      this.erroPreco = 'O preço deve ser maior ou igual a 0';
      valido = false;
    }

    if (!valido) return; // não envia se houver erro

    if (this.produto.id && this.produto.id > 0) {
        // atualiza produto
    this.produtoService.updateProduto(this.produto.id, this.produto)
      .subscribe(() => {
        this.mensagem = 'Produto atualizado com sucesso! ';
      }, err => {
        console.error(err);
        this.mensagem = 'Erro ao atualizar produto!';
      });
  } else {
    // cria produto
    this.produtoService.createProduto(this.produto)
      .subscribe(() => {
        this.mensagem = 'Produto cadastrado com sucesso! ';
        // limpa formulário após cadastro
        this.produto = { id: 0, nome: '', preco: 0, descricao: '', categoria: '', disponivel: true };
      }, err => {
        console.error(err);
        this.mensagem = 'Erro ao cadastrar produto!';
      });
  }
}
}