import { Topics } from './topics';

interface LegacyAccountUpdatedData {
  accountNumber: string;
  holderName: string;
  holderPhone: string;
  holderAddress: string;
  version: number;
}

interface LegacyAccountUpdatedEvent {
  metadata: {
    name: Topics.LegacyAccountUpdated;
  };
  data: LegacyAccountUpdatedData;
}
export { LegacyAccountUpdatedEvent, LegacyAccountUpdatedData };
