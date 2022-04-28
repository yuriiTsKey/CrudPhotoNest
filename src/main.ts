import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { config } from 'aws-sdk';
import { graphqlUploadExpress } from 'graphql-upload';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const Port = process.env.PORT;

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: true, credentials: true });
  app.use(graphqlUploadExpress({ maxFileSize: 2 * 1000 * 1000 }));

  config.update({
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
    region: `${process.env.AWS_REGION}`,
  });

  await app.listen(Port);
  console.log(`Start localhost ${Port}`);
}
bootstrap();
