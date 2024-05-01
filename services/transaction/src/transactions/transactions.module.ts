import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NatsModule } from 'common';
import { Transaction } from './entities/transaction.entity';
import { TransactionObserver } from './observers/transaction.observer';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), NatsModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionObserver],
})
export class TransactionsModule {}
