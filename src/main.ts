import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log("[PROCESS 0]", process.env)
  const app = await NestFactory.create(AppModule);
  console.log("[PROCESS 99]", process.env)
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
