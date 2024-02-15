import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TransactionsEntity, TransacoesTipos, TransacoesTiposEnum } from "../entities/transacoes.entity";
import { ClientesEntity } from "../entities/cliente.entity";

@Injectable()
export class TransactionsRepository {
  constructor(
    @InjectRepository(TransactionsEntity)
    private readonly transacoesRepository: Repository<TransactionsEntity>,
  ) { }

  async getLastTransactions(id: number, limit: number = 10): Promise<TransactionsEntity[]> {
    const transacoes = await this.transacoesRepository.find({ where: { clienteId: id }, order: { id: 'DESC' }, take: limit });

    return transacoes;
  }

  async handleTransaction(cliente: ClientesEntity, value: number, type: TransacoesTipos, description: string) {
    const { saldo, limite } = cliente;
    const novoSaldo = saldo + value;

    if (type === TransacoesTiposEnum.DEBITO && (novoSaldo < (limite * -1))) {
      Logger.error(`Saldo insuficiente. ID: ${cliente.id} | Saldo: ${novoSaldo} | Limite: ${limite}`)
      throw new HttpException('Saldo insuficiente', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const transacao = this.transacoesRepository.manager.transaction(async transactionalEntityManager => {
      const client = await transactionalEntityManager.findOne(ClientesEntity, {
        where: { id: cliente.id },
        lock: { mode: 'pessimistic_write' }
      });

      const transacaoSalvar = new TransactionsEntity(client.id, {
        valor: value,
        tipo: type,
        descricao: description
      });

      client.saldo = novoSaldo;

      await transactionalEntityManager.save(transacaoSalvar);
      await transactionalEntityManager.save(client);

      return {
        limite: limite,
        saldo: novoSaldo
      }
    });

    return transacao;
  }
}