import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { NatsModule } from 'common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TransactionsModule,
    NatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
