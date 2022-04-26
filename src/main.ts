import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({ origin: true, credentials: true });

  // console.log(process.env.SENDMAIL);
  // console.log(process.env.SomePassport);

  const Port = 5000;
  await app.listen(Port);
  console.log(`Start localhost ${Port}`);
}
bootstrap();
