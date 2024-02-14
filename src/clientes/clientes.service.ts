import { Injectable } from '@nestjs/common';
import { ClientsRepository } from './repositories/cliente.repository';
import { ClienteExtratoResponseDto } from './dto/cliente-extrato-response.dto';
import { TransactionsRepository } from './repositories/transacoes.repository';
import { TransactionClienteRequestDto, TransactionClienteResponseDto } from './dto/cliente-transacao.dto';

@Injectable()
export class ClientesService {

  constructor(
    private readonly clientsRepository: ClientsRepository,
    private readonly transactionsRepository: TransactionsRepository,
  ) { }

  async bankStatement(id: number): Promise<ClienteExtratoResponseDto> {
    const cliente = await this.clientsRepository.findById(id)
    const clienteTransacoes = await this.transactionsRepository.getLastTransactions(cliente.id)

    return new ClienteExtratoResponseDto({
      total: cliente.saldo,
      limite: cliente.limite
    }, clienteTransacoes)
  }

  async transaction(id: number, transaction: TransactionClienteRequestDto): Promise<TransactionClienteResponseDto> {
    const cliente = await this.clientsRepository.findById(id)

    const { descricao, tipo, valor } = transaction;

    return await this.transactionsRepository.handleTransaction(cliente, valor, tipo, descricao);
  }
}
