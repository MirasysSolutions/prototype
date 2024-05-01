import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { NatsModule } from 'common';

@Module({
  imports: [TypeOrmModule.forFeature([Account, NatsModule])],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
