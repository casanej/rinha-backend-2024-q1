import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { ClientesEntity, ClientesEntityRelations } from "../entities/cliente.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TransactionsEntity } from "../entities/transacoes.entity";


@Injectable()
export class ClientsRepository {
  constructor(
    @InjectRepository(ClientesEntity)
    private readonly clientesRepository: Repository<ClientesEntity>,
  ) { }

  async findById(id: number, relations?: ClientesEntityRelations[]): Promise<ClientesEntity> {

    const client = await this.clientesRepository.findOne({ where: { id }, relations: relations ?? [] });

    if (!client) {
      Logger.error(`Cliente não encontrado. ID: ${id}`);
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
    }

    return client;
  }

  async eraseDatabase() {
    return await this.clientesRepository.manager.transaction(async transactionalEntityManager => {
      await transactionalEntityManager.delete(TransactionsEntity, {});
      await transactionalEntityManager.update(ClientesEntity, {}, { saldo: 0 });
    });
  }
}