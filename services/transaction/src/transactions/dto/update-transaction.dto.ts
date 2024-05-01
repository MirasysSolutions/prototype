import { Length } from 'class-validator';

export class UpdateTransactionDto {
  @Length(1, 255)
  note?: string;
}
