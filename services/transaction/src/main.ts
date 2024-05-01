import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NatsService } from 'common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    strategy: app.get(NatsService).strategy,
  });

  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
