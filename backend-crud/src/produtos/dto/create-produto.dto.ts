import { IsNotEmpty, IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty({ message: "O nome é obrigatório" })
  nome: string;

  @IsNumber()
  @Min(0, { message: "O preço não pode ser negativo" })
  preco: number; 

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsString()
  @IsOptional()
  categoria?: string; 

  @IsOptional()
  disponivel: boolean; 
}