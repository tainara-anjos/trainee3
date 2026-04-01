// O service é responsável pela lógica da aplicação e pela comunicação com o banco de dados usando o TypeORM.

import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { Produto } from './entities/produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';


@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository (Produto) //Aqui eu injeto o repository do produto, que é quem faz as operações no banco de dados.

    private readonly produtoRepository: Repository<Produto>,
){}

   async createProduto(produtoData: CreateProdutoDto): Promise<Produto> {
  const produto = this.produtoRepository.create({
    ...produtoData,
    preco: produtoData.preco ?? 0,
    descricao: produtoData.descricao ?? 'Sem descrição',
    categoria: produtoData.categoria ?? 'Sem categoria',
    disponivel: produtoData.disponivel ?? true,
  });

  return this.produtoRepository.save(produto);
}

 async findAll(): Promise<Produto[]> {
    return this.produtoRepository.find();
  }

  async findOne(id: number):  Promise<Produto> {
const produto = await this.produtoRepository.findOneBy ({ id });
if(!produto){
  throw new NotFoundException(`User with ID ${id} not found `);
}
return produto;
  }
    
 async update(id: number, produtoData: Partial<Produto>): Promise<Produto> {
  // preload pega o produto existente e mistura com os dados novos
  const produto = await this.produtoRepository.preload({
    id,
    ...produtoData, 
  });

  if (!produto) {
    throw new Error('Produto não encontrado');
  }

  return this.produtoRepository.save(produto);
}
 
   async remove(id: number): Promise<void> {
    const result = await this.produtoRepository.delete(id);
    if(result.affected === 0)
    throw new NotFoundException(`User with ID ${id} not found`);
  }
}
