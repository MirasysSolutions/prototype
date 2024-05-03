import {
  Length,
  IsDecimal,
  IsUUID,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class SyncTransactionDto {
  @IsUUID()
  id: string;

  @Length(1, 255)
  accountNumber: string;

  @IsDecimal()
  amount: number;

  @IsDateString()
  date: string;

  @Length(1, 255)
  note?: string;

  @IsNumber()
  version: number;
}
