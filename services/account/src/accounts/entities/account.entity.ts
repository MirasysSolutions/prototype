import { ObservableEntity } from 'common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('accounts')
export class Account extends ObservableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  accountNumber: string;

  @Column()
  holderName: string;

  @Column()
  holderPhone: string;

  @Column()
  holderAddress: string;

  @Column()
  holderCountry: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
    default: 0,
  })
  balance: number;

  @Column({ default: 0 })
  version!: number;

  serialize() {
    return {
      id: this.id,
      accountNumber: this.accountNumber,
      holderName: this.holderName,
      holderPhone: this.holderPhone,
      holderAddress: this.holderAddress,
      holderCountry: this.holderCountry,
      balance: this.balance,
      version: this.version,
    };
  }
}
