import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NatsService } from 'common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    strategy: app.get(NatsService).strategy,
  });

  // Swagger
  const docConfig = new DocumentBuilder()
    .setTitle('AccountService')
    .setDescription('AccountService API description')
    .setVersion('1.0')

    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
