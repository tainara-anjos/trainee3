// O controller é responsável por definir as rotas da API e receber as requisições do frontend. Ele não contém a lógica, apenas chama o service."

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { Produto } from './entities/produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';

@Controller('produtos')       //Define o caminho base das rotas (/produtos).

export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
 async create(@Body() produtoData: CreateProdutoDto) { 
    return this.produtosService.createProduto(produtoData);
  }

  @Get()
  findAll(): Promise<Produto[]> {
    return this.produtosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Produto> {
  const produtoId = parseInt(id);

  if (isNaN(produtoId)) {
    throw new Error('ID inválido');
  }

  return this.produtosService.findOne(produtoId);
}

 @Patch(':id')
update(@Param('id') id: string, @Body() produtoData: Partial<Produto>) {
  const produtoId = parseInt(id);
  if (isNaN(produtoId)) throw new Error('ID inválido');
  return this.produtosService.update(produtoId, produtoData);
}

 @Delete(':id')
remove(@Param('id') id: string): Promise<void> {
  const produtoId = parseInt(id);

  if (isNaN(produtoId)) {
    throw new Error('ID inválido');
  }
  return this.produtosService.remove(produtoId);
}
}

// private readonly → private significa que só posso usar dentro da classe, e readonly significa que não pode ser alterado depois de criado.
// async → função assíncrona
// Promise<Produto[]> →Promise é uma resposta futura. Aqui significa que a função vai retornar uma lista de produtos, mas não imediatamente, porque depende do banco.
// findAll() → pega todos os produtos,É um método que busca todos os registros. Eu dei esse nome pra indicar que ele retorna todos os produtos.
// isNaN() →Verifica se o valor NÃO é um número válido.
// parseInt() → Converte o ID de string para número, porque o parâmetro da URL sempre vem como texto.
