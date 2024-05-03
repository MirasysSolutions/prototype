import { Length, IsDecimal, IsUUID } from 'class-validator';

export class CreateTransactionDto {
  @IsUUID()
  id: string;

  @Length(1, 255)
  accountNumber: string;

  @IsDecimal()
  amount: number;

  @Length(1, 255)
  note?: string;
}
