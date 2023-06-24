import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../modules/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants/jwt.constants';

dotenv.config();

/**
 * Authentication Module exposing Auth Controller, Auth Service, JWT configuration
 * @date 6/24/2023
 *
 * @export
 * @class AuthModule
 * @typedef {AuthModule}
 */
@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
