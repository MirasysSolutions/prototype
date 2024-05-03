import { Topics } from './topics';

interface LegacyTransactionUpdatedData {
  id: string;
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
