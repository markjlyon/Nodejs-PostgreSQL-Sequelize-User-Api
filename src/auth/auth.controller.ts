import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuardian } from './auth.guardian';
import { AuthService } from './auth.service';

/**
 * AuthController with AuthGuardian and AuthService
 * @date 6/24/2023
 *
 * @export
 * @class AuthController
 * @typedef {AuthController}
 */
@Controller('auth')
export class AuthController {
  /**
   * Creates an instance of AuthController.
   * @date 6/24/2023
   *
   * @constructor
   * @param {AuthService} authService
   */
  constructor(private authService: AuthService) {}

  /**
   * Process the login request
   * @date 6/24/2023
   *
   * @param {Record<string, string>} loginDto
   * @returns {*}
   */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  userLogin(@Body() loginDto: Record<string, string>) {
    return this.authService.userLogin(loginDto.email, loginDto.password);
  }

  /**
   * Return the JWT profile of the currently logged in user
   * @date 6/24/2023
   *
   * @param {*} request
   * @returns {*}
   */
  @UseGuards(AuthGuardian)
  @Get('profile')
  getProfile(@Request() request) {
    return request.user;
  }
}
