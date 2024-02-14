import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ClientesEntity, ClientesEntityRelations } from "../entities/cliente.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class ClientsRepository {
  constructor(
    @InjectRepository(ClientesEntity)
    private readonly clientesRepository: Repository<ClientesEntity>,
  ) { }

  async findById(id: number, relations?: ClientesEntityRelations[]): Promise<ClientesEntity> {

    const client = await this.clientesRepository.findOne({ where: { id }, relations: relations ?? [] });

    if (!client) {
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
    }

    return client;
  }
}