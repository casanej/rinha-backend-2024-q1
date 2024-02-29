import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { TransactionClienteRequestDto } from './dto/cliente-transacao.dto';

@Controller('clientes')
export class ClientController {
  constructor(private readonly clientesService: ClientesService) { }

  @Get(':id/extrato')
  @HttpCode(200)
  async clientBankStatement(@Param('id') id: string) {
    return await this.clientesService.bankStatement(+id);
  }

  @Post(':id/transacoes')
  @HttpCode(200)
  async clientTransactions(@Param('id') id: string, @Body() transaction: TransactionClienteRequestDto) {
    return await this.clientesService.transaction(+id, transaction);
  }

  @Get('erase')
  @HttpCode(200)
  eraseDatabase() {
    return this.clientesService.eraseDatabase();
  }
}
