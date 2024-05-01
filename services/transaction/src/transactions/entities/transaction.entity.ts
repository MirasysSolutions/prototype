import { ObservableEntity } from 'common';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Entity,
} from 'typeorm';

@Entity('transactions')
export class Transaction extends ObservableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  accountNumber: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  amount: number;

  @CreateDateColumn({ type: 'timestamptz' })
  date: Date;

  @Column({ nullable: true })
  note?: string;

  @Column({ default: 0 })
  version!: number;

  serialize() {
    return {
      id: this.id,
      accountNumber: this.accountNumber,
      amount: this.amount,
      date: this.date,
      note: this.note,
      version: this.version,
    };
  }
}
