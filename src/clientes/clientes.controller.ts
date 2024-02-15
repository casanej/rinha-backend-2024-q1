import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { TransactionClienteRequestDto } from './dto/cliente-transacao.dto';

@Controller('clientes')
export class ClientController {
  constructor(private readonly clientesService: ClientesService) { }

  @Get(':id/extrato')
  clientBankStatement(@Param('id') id: string) {
    return this.clientesService.bankStatement(+id);
  }

  @Post(':id/transacoes')
  clientTransactions(@Param('id') id: string, @Body() transaction: TransactionClienteRequestDto) {
    return this.clientesService.transaction(+id, transaction);
  }
}
