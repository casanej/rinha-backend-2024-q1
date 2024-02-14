import { IsDefined, IsNotEmptyObject, IsNumber, IsObject, IsString, Length, MaxLength, ValidateNested } from "class-validator";
import { TransactionsEntity, TransacoesTipos } from "../entities/transacoes.entity";
import { Type } from "class-transformer";

type ClienteExtratoSaldoDtoPartial = Partial<Omit<ClienteExtratoResponseSaldoDto, 'data_extrato'>>;

export class ClienteExtratoResponseSaldoDto {

    constructor(partial?: ClienteExtratoSaldoDtoPartial) {
        if (partial) {
            this.total = partial.total;
            this.limite = partial.limite;
        }

        this.data_extrato = new Date().toISOString();
    }

    @IsNumber()
    total: number;

    @IsString()
    data_extrato: string;

    @IsNumber()
    limite: number;
}

export class ClienteExtratoResponseTransacoesDto {
    constructor(valor?: number, tipo?: TransacoesTipos, descricao?: string) {
        if (valor) this.valor = valor;
        if (tipo) this.tipo = tipo;
        if (descricao) this.descricao = descricao;

        this.realizado_em = new Date().toISOString();
    }

    @IsNumber()
    valor: number;

    @IsString()
    @MaxLength(1)
    tipo: TransacoesTipos;

    @IsString()
    @Length(1, 10)
    descricao: string;

    @IsString()
    realizado_em: string;
}

export class ClienteExtratoResponseDto {

    constructor(saldo?: ClienteExtratoSaldoDtoPartial, transacoes?: TransactionsEntity[]) {
        if (saldo) this.saldo = new ClienteExtratoResponseSaldoDto(saldo);
        if (transacoes) {
            this.ultimas_transacoes = transacoes.map(({ valor, tipo, descricao }) => (new ClienteExtratoResponseTransacoesDto(valor, tipo, descricao)));
        }
    }

    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => ClienteExtratoResponseSaldoDto)
    saldo: ClienteExtratoResponseSaldoDto;

    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => ClienteExtratoResponseTransacoesDto)
    ultimas_transacoes: ClienteExtratoResponseTransacoesDto[];
}