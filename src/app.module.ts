import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './clientes/clientes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesEntity } from './clientes/entities/cliente.entity';
import { TransactionsEntity } from './clientes/entities/transacoes.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATANASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      entities: [
        ClientesEntity,
        TransactionsEntity,
      ],
      synchronize: false,
    }),
    ClientModule
  ],
  providers: []
})
export class AppModule { }
