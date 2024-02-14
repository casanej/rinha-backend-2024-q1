import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/clientes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesEntity } from './clientes/entities/cliente.entity';
import { TransactionsEntity } from './clientes/entities/transacoes.entity';

console.log("[PROCESS 1]", process.env)

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
      synchronize: true,
    }),
    ClientesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
