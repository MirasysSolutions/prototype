import { Length, IsDecimal } from 'class-validator';

export class CreateTransactionDto {
  @Length(1, 255)
  accountNumber: string;

  @IsDecimal()
  amount: number;

  @Length(1, 255)
  note?: string;
}
