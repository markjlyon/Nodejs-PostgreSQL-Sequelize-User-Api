import * as dotenv from 'dotenv';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtService } from '@nestjs/jwt';

const bcrypt = require('bcrypt');

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

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

async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
}
