import { NatsService, Observer, Topics, TransactionCreatedEvent } from 'common';
import { Transaction } from '../entities/transaction.entity';
import { Injectable } from '@nestjs/common';
import { TransactionCreatedPublisher } from '../publishers/transaction-created.publisher';

@Injectable()
class TransactionObserver implements Observer<Transaction> {
  constructor(private natsService: NatsService) {}
  public async update(subject: Transaction): Promise<void> {
    // event data
    const event: TransactionCreatedEvent = {
      metadata: {
        name: Topics.TransactionCreated,
      },
      data: {
        accountNumber: subject.accountNumber,
        amount: subject.amount,
      },
    };

    // publish user updated event
    const publisher = new TransactionCreatedPublisher(this.natsService);
    await publisher.publish(event);
  }
}

export { TransactionObserver };
