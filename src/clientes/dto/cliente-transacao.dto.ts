import { IsNotEmpty, IsNumber, IsString, Matches, MaxLength } from 'class-validator';
import { TransacoesTipos } from '../entities/transacoes.entity';

export class TransactionClienteRequestDto {
  @IsNotEmpty()
  @IsNumber()
  readonly valor: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1)
  @Matches(/^(c|d)$/)
  readonly tipo: TransacoesTipos;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  readonly descricao: string;
}

export class TransactionClienteResponseDto {
  @IsNotEmpty()
  @IsNumber()
  limite: number;

  @IsNotEmpty()
  @IsNumber()
  saldo: number;
}