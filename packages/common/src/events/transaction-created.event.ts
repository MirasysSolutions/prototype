import { Topics } from './topics';

interface TransactionCreatedData {
  accountNumber: string;
  amount: number;
}

interface TransactionCreatedEvent {
  metadata: {
    name: Topics.TransactionCreated;
  };
  data: TransactionCreatedData;
}

export { TransactionCreatedEvent, TransactionCreatedData };
