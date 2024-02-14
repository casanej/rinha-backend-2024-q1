import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TransactionsEntity } from "./transacoes.entity";

// export type ClientesEntityRelations = 'transacoes' | 'saldos';
export type ClientesEntityRelations = any;

@Entity('clientes')
export class ClientesEntity {

  constructor(partial?: Partial<ClientesEntity>) {
    if (partial) {
      this.id = partial.id
      this.nome = partial.nome
      this.limite = partial.limite
      this.saldo = partial.saldo
    }
  }

  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nome: string;

  @Column({ type: 'int4' })
  limite: number;

  @Column({ type: 'int4', default: 0 })
  saldo: number;

  @OneToMany(() => TransactionsEntity, transacoes => transacoes.cliente, { cascade: true })
  transacoes: TransactionsEntity[];
}