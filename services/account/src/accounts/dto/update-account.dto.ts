import { Length, IsDecimal, IsNumber } from 'class-validator';

export class UpdateAccountDto {
  @Length(1, 255)
  holderName?: string;

  @Length(1, 255)
  holderPhone?: string;

  @Length(1, 255)
  holderAddress?: string;

  @Length(2, 2)
  holderCountry?: string;

  @IsDecimal()
  balance?: number;

  @IsNumber()
  version: number;
}
