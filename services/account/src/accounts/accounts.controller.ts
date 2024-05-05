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
import { LegacyAccountCreatedEvent } from 'common';

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

  @Post('truncate')
  async truncate() {
    await this.accountsService.truncate();
    return { message: 'Truncated' };
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
      version: account.version,
    });
    context.ack();
  }

  @EventPattern('legacyAccount.created')
  async handleLegacyAccountCreatedEvent(
    @Payload() event: LegacyAccountCreatedEvent,
    @Ctx() context: JsMsg,
  ) {
    console.info('Event received', event);
    // create new bank account
    await this.accountsService.create({
      accountNumber: event.data.accountNumber,
      balance: event.data.balance,
      holderAddress: event.data.holderAddress,
      holderName: event.data.holderName,
      holderPhone: event.data.holderPhone,
      holderCountry: event.data.holderCountry ?? 'FI',
    });
    context.ack();
  }

  @EventPattern('legacyAccount.updated')
  async handleLegacyAccountUpdatedEvent(
    @Payload() event: LegacyAccountCreatedEvent,
    @Ctx() context: JsMsg,
  ) {
    console.info('Event received', event);
    // update bank account
    await this.accountsService.update(event.data.accountNumber, {
      holderAddress: event.data.holderAddress,
      holderName: event.data.holderName,
      holderPhone: event.data.holderPhone,
      holderCountry: event.data.holderCountry,
      version: event.data.version - 1, // new version need to be one less than the current version
    });
    context.ack();
  }

  @EventPattern('account.sync')
  async handleAccountSyncEvent(@Payload() event: any, @Ctx() context: JsMsg) {
    console.info('Event received', event);
    // sync account
    await this.accountsService.sync({
      accountNumber: event.data.accountNumber,
      holderAddress: event.data.holderAddress,
      holderName: event.data.holderName,
      holderPhone: event.data.holderPhone,
      holderCountry: event.data.holderCountry ?? 'FI',
      version: event.data.version,
    });
    context.ack();
  }
}
