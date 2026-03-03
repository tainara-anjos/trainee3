import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsInt,
  Min,
  Max,
  IsEmail,
  Matches,
} from 'class-validator';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsInt()
  @Min(0)
  @Max(120)
  age: number;

  @IsEmail()
  email: string;

  @Matches(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, {
  message: 'CPF inválido',

  })
  cpf: string;
}