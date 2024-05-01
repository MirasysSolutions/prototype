import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionObserver } from './observers/transaction.observer';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private repo: Repository<Transaction>,
    private transactionObserver: TransactionObserver,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const transaction = this.repo.create(createTransactionDto);
    const savedTransaction = await this.repo.save(transaction);
    // notify observers
    transaction.attach(this.transactionObserver);
    transaction.notify();
    // return the created entity
    return savedTransaction.serialize();
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: string) {
    return await this.repo.findOne({ where: { id } });
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const result = await this.repo.update({ id }, updateTransactionDto);
    if (result.affected === 0) {
      throw new Error('No records found to update');
    }
    // Retrieve and return the updated entity
    return await this.repo.findOne({ where: { id } });
  }

  async remove(id: string) {
    return (await this.repo.delete({ id })).affected === 1;
  }
}
