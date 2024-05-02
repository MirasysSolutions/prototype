import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { JsMsg } from 'nats';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { TransactionCreatedEvent } from 'common';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':accountNumber')
  findOne(@Param('accountNumber') accountNumber: string) {
    return this.accountsService.findOne(accountNumber);
  }

  @Patch(':accountNumber')
  update(
    @Param('accountNumber') accountNumber: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountsService.update(accountNumber, updateAccountDto);
  }

  @Delete(':accountNumber')
  remove(@Param('accountNumber') accountNumber: string) {
    return this.accountsService.remove(accountNumber);
  }

  // subscribe to events
  @EventPattern('transaction.created')
  async handleTransactionCreatedEvent(
    @Payload() event: TransactionCreatedEvent,
    @Ctx() context: JsMsg,
  ) {
    console.info('Event received', event);
    // upadte account balance
    const account = await this.accountsService.findOne(
      event.data.accountNumber,
    );
    const newBalance = account.balance + event.data.amount;
    await this.accountsService.update(event.data.accountNumber, {
      balance: newBalance,
    });
    context.ack();
  }
}
