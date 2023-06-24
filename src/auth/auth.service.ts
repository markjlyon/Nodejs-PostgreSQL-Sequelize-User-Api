import * as dotenv from 'dotenv';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtService } from '@nestjs/jwt';

/**
 * bcrypt for password salt and hash
 * @date 6/24/2023
 *
 * @type {*}
 */
const bcrypt = require('bcrypt');

dotenv.config();

/**
 * AuthService Class
 * @date 6/24/2023
 *
 * @export
 * @class AuthService
 * @typedef {AuthService}
 */
@Injectable()
export class AuthService {
  /**
   * Creates an instance of AuthService.
   * @date 6/24/2023
   *
   * @constructor
   * @param {UserService} userService
   * @param {JwtService} jwtService
   */
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * Log the user in by comparing the saved hash against the requested password hashed with salt
   * @date 6/24/2023
   *
   * @async
   * @param {string} email
   * @param {string} password
   * @returns {Promise<any>}
   */
  async userLogin(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    let result = await comparePassword(password, user.password);
    if (!result) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.email, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

/**
 * Method to compare the request password hashed with salt to the stored hash
 * @date 6/24/2023
 *
 * @async
 * @param {*} plaintextPassword
 * @param {*} hash
 * @returns {unknown}
 */
async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
}
