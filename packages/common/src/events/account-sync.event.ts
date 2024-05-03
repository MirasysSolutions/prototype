import { Topics } from './topics';

interface AccountSyncData {
  accountNumber: string;
  holderName: string;
  holderPhone: string;
  holderAddress: string;
  balance: number;
  version: number;
}

interface AccountSyncEvent {
  metadata: {
    name: Topics.AccountSync;
  };
  data: AccountSyncData;
}

export { AccountSyncEvent, AccountSyncData };
