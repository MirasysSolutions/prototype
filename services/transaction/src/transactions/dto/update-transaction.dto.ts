import { IsNumber, Length } from 'class-validator';

export class UpdateTransactionDto {
  @Length(1, 255)
  note?: string;

  @IsNumber()
  version: number;
}
