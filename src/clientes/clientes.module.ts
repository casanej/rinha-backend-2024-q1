import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientController } from './clientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesEntity } from './entities/cliente.entity';
import { TransactionsEntity } from './entities/transacoes.entity';
import { ClientsRepository } from './repositories/cliente.repository';
import { TransactionsRepository } from './repositories/transacoes.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientesEntity, TransactionsEntity]),
  ],
  controllers: [ClientController],
  providers: [ClientesService, ClientsRepository, TransactionsRepository],
})
export class ClientModule { }
