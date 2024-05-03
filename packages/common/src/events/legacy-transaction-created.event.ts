import { Topics } from './topics';

interface LegacyTransactionCreatedData {
  id: string;
  accountNumber: string;
  amount: number;
  date: string;
  note?: string;
  version: number;
}

interface LegacyTransactionCreatedEvent {
  metadata: {
    name: Topics.LegacyTransactionCreated;
  };
  data: LegacyTransactionCreatedData;
}
export { LegacyTransactionCreatedEvent, LegacyTransactionCreatedData };
