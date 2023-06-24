import { NestFactory } from '@nestjs/core';
import { ApiModule } from './modules/api.module';

async function bootstrap() {
  const api = await NestFactory.create(ApiModule);
  api.setGlobalPrefix('api/v0');
  await api.listen(3000);
}
bootstrap();
