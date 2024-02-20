import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientModule } from './clientes/clientes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesEntity } from './clientes/entities/cliente.entity';
import { TransactionsEntity } from './clientes/entities/transacoes.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';

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
    ClientModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useFactory: (configService: ConfigService) => {
        const timeoutInMilliseconds: number = parseInt(configService.get<any>('TIMEOUT_IN_MILLISECONDS', 30000));
        return new TimeoutInterceptor(timeoutInMilliseconds);
      },
      inject: [ConfigService],
    }
  ]
})
export class AppModule { }
