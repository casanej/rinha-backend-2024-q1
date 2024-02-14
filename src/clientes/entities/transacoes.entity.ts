import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ClientesEntity } from "./cliente.entity";

export type TransacoesTipos = 'c' | 'b';

export enum TransacoesTiposEnum {
  CREDITO = 'c',
  DEBITO = 'b'
}

type TransacoesEntityInit = Partial<Omit<TransactionsEntity, 'clientId' | 'realizadaEm'>>

@Entity('transacoes')
export class TransactionsEntity {

  constructor(clienteId: number, partial?: TransacoesEntityInit) {
    if (partial) {
      this.clienteId = clienteId;
      this.tipo = partial.tipo;
      this.descricao = partial.descricao;
    }

    this.valor = partial?.valor;
    this.realizadaEm = new Date().toISOString();
  }

  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ name: 'cliente_id', type: 'int4' })
  clienteId: number;

  @Column({ type: 'int4', default: 0 })
  valor: number;

  @Column({ type: 'varchar', length: 1 })
  tipo: TransacoesTipos;

  @Column({ type: 'varchar', length: 10 })
  descricao: string;

  @Column({ name: 'realizada_em', type: 'date', default: () => 'CURRENT_DATE' })
  realizadaEm: string;

  @ManyToOne(() => ClientesEntity)
  @JoinColumn({ name: 'cliente_id', referencedColumnName: 'id' })
  cliente: ClientesEntity;
}