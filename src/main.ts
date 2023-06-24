import { NestFactory } from '@nestjs/core';
import { ApiModule } from './modules/api.module';

/**
 * Initial Bootstrap of the Api
 * @date 6/24/2023
 *
 * @async
 * @returns {*}
 */
async function bootstrap() {
  const api = await NestFactory.create(ApiModule);
  api.setGlobalPrefix('api/v0');
  await api.listen(3000);
}
bootstrap();
