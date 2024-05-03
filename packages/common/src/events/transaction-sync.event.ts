import { Topics } from './topics';

interface TransactionSyncData {
  id: string;
  accountNumber: string;
  amount: number;
  date: string;
  note?: string;
  version: number;
}

interface TransactionSyncEvent {
  metadata: {
    name: Topics.TransactionSync;
  };
  data: TransactionSyncData;
}

export { TransactionSyncEvent, TransactionSyncData };
