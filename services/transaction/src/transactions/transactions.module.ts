import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionObserver } from './observers/transaction.observer';
import { NatsModule } from './../nats/nats.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), NatsModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionObserver],
})
export class TransactionsModule {}
