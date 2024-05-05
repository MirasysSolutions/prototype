import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { JsMsg } from 'nats';
import {
  LegacyTransactionCreatedEvent,
  LegacyTransactionUpdatedEvent,
  TransactionSyncEvent,
} from 'common';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }

  @Post('truncate')
  async truncate() {
    await this.transactionsService.truncate();
    return { message: 'Truncated' };
  }

  @EventPattern('transaction.sync')
  async handleTransactionSyncEvent(
    @Payload() event: TransactionSyncEvent,
    @Ctx() context: JsMsg,
  ) {
    console.info('Event received', event);
    // sync transaction
    await this.transactionsService.sync({
      id: event.data.transactionNumber,
      accountNumber: event.data.accountNumber,
      amount: event.data.amount,
      date: event.data.date,
      note: event.data.note,
      version: event.data.version,
    });
    context.ack();
  }

  @EventPattern('legacyTransaction.created')
  async handleLegacyTransactionCreatedEvent(
    @Payload() event: LegacyTransactionCreatedEvent,
    @Ctx() context: JsMsg,
  ) {
    console.info('Event received', event);
    // create new bank account
    await this.transactionsService.create({
      id: event.data.transactionNumber,
      accountNumber: event.data.accountNumber,
      amount: event.data.amount,
      note: event.data.note,
    });
    context.ack();
  }

  @EventPattern('legacyTransaction.updated')
  async handleLegacyTransactionUpdatedEvent(
    @Payload() event: LegacyTransactionUpdatedEvent,
    @Ctx() context: JsMsg,
  ) {
    console.info('Event received', event);
    await this.transactionsService.update(event.data.transactionNumber, {
      note: event.data.note,
      version: event.data.version - 1,
    });
    context.ack();
  }
}
