import { Length, IsNumber } from 'class-validator';

export class SyncAccountDto {
  @Length(1, 255)
  accountNumber: string;

  @Length(1, 255)
  holderName: string;

  @Length(1, 255)
  holderPhone: string;

  @Length(1, 255)
  holderAddress: string;

  @Length(2, 2)
  holderCountry: string;

  @IsNumber()
  version: number;
}
