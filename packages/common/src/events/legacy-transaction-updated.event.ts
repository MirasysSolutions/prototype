import { Topics } from './topics';

interface LegacyTransactionUpdatedData {
  transactionNumber: string;
  note?: string;
  version: number;
}

interface LegacyTransactionUpdatedEvent {
  metadata: {
    name: Topics.LegacyTransactionUpdated;
  };
  data: LegacyTransactionUpdatedData;
}

export { LegacyTransactionUpdatedEvent, LegacyTransactionUpdatedData };
