import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { UserProvider } from '../core/database/users.provider';

/**
 * User Module for User Controller and User Service
 * @date 6/24/2023
 *
 * @export
 * @class UserModule
 * @typedef {UserModule}
 */
@Module({
  controllers: [UserController],
  providers: [UserService, ...UserProvider],
  exports: [UserService],
})
export class UserModule {}
