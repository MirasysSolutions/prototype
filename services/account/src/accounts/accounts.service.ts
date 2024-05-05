import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { SyncAccountDto } from './dto/sync-account.dto';

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
    // load the entity
    const account = await this.repo.findOne({ where: { accountNumber } });
    if (!account) {
      throw new Error('No records found to update');
    }
    // check version
    if (account.version !== updateAccountDto.version) {
      throw Error('Version mismatch');
    }
    // update the entity
    const result = await this.repo.update(
      { accountNumber },
      { ...updateAccountDto, version: account.version + 1 },
    );
    if (result.affected === 0) {
      throw new Error('Error updating record');
    }
    // Retrieve and return the updated entity
    return await this.repo.findOne({ where: { accountNumber } });
  }

  async remove(accountNumber: string) {
    return (await this.repo.delete({ accountNumber })).affected === 1;
  }

  async truncate() {
    await this.repo.clear();
  }

  async sync(dto: SyncAccountDto) {
    // sync account
    await this.repo.upsert(dto, ['accountNumber']);
  }
}
