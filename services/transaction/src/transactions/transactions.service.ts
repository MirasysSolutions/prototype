import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionObserver } from './observers/transaction.observer';
import { SyncTransactionDto } from './dto/sync-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private repo: Repository<Transaction>,
    private transactionObserver: TransactionObserver,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    // make sure thre is no uuid
    const tx = await this.repo.findOne({
      where: { id: createTransactionDto.id },
    });
    if (tx) {
      throw new Error('Transaction already exists');
    }

    const transaction = this.repo.create(createTransactionDto);
    const savedTransaction = await this.repo.save(transaction);
    console.log('Transaction created', savedTransaction);
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
    // find the entity to update
    const tx = await this.repo.findOne({ where: { id } });
    if (!tx) {
      throw new Error('No records found');
    }
    // check version
    if (tx.version !== updateTransactionDto.version) {
      throw new Error('Version mismatch');
    }
    // update the entity
    const result = await this.repo.update(
      { id },
      {
        ...updateTransactionDto,
        version: tx.version + 1,
      },
    );
    if (result.affected === 0) {
      throw new Error('No records found to update');
    }
    // Retrieve and return the updated entity
    return await this.repo.findOne({ where: { id } });
  }

  async remove(id: string) {
    return (await this.repo.delete({ id })).affected === 1;
  }

  async sync(dto: SyncTransactionDto) {
    // check if the transaction exists
    const existing = await this.repo.findOne({ where: { id: dto.id } });
    const result = await this.repo.upsert(dto, ['id']);
    if (result && !existing) {
      // new tx, notify observers
      const transaction = await this.repo.findOne({ where: { id: dto.id } });
      transaction.attach(this.transactionObserver);
      transaction.notify();
    }
  }
}
