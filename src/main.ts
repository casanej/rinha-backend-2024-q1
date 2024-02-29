import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TimeoutInterceptor(+process.env.TIMEOUT_IN_MILLISECONDS || 60000));
  await app.listen(3000, '::');
}
bootstrap();
