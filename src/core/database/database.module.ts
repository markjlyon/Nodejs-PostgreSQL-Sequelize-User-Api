import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';

/**
 * Database Module exposing Database Providers
 * @date 6/24/2023
 *
 * @export
 * @class DatabaseModule
 * @typedef {DatabaseModule}
 */
@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
