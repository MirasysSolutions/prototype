import { Topics } from './topics';

interface LegacyAccountCreatedData {
  accountNumber: string;
  holderName: string;
  holderPhone: string;
  holderAddress: string;
  holderCountry: string;
  balance: number;
  version: number;
}

interface LegacyAccountCreatedEvent {
  metadata: {
    name: Topics.LegacyAccountCreated;
  };
  data: LegacyAccountCreatedData;
}

export { LegacyAccountCreatedEvent, LegacyAccountCreatedData };
