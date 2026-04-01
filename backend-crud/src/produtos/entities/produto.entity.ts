import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ type: 'decimal', nullable: true, default: 0 }) 
  preco: number;

  @Column({ nullable: true })
  descricao: string;

  @Column({ nullable: true })
  categoria: string;

  @Column({ default: true })
  disponivel: boolean;
}

// @Entity()
//  → Indica que essa classe vira uma tabela no banco.
// export class Produto
//  → Classe que representa a tabela Produto.

// Campos (colunas)
// id
//  → @PrimaryGeneratedColumn()
//  → Chave primária, gerada automaticamente (tipo auto-incremento).
// nome
//  → @Column()
//  → Nome do produto (obrigatório).
// preco
//  → decimal, pode ser nulo, padrão = 0.
// descricao
//  → Texto opcional (pode ser nulo).
// categoria
//  → Texto opcional.
// disponivel
//  → Booleano (true/false), padrão = true.