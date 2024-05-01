import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountsService {
  constructor(@InjectRepository(Account) private repo: Repository<Account>) {}

  async create(createAccountDto: CreateAccountDto) {
    return await this.repo.save(createAccountDto);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(accountNumber: string) {
    return await this.repo.findOne({ where: { accountNumber } });
  }

  async update(accountNumber: string, updateAccountDto: UpdateAccountDto) {
    const result = await this.repo.update({ accountNumber }, updateAccountDto);
    if (result.affected === 0) {
      throw new Error('No records found to update');
    }
    // Retrieve and return the updated entity
    return await this.repo.findOne({ where: { accountNumber } });
  }

  async remove(accountNumber: string) {
    return (await this.repo.delete({ accountNumber })).affected === 1;
  }
}
