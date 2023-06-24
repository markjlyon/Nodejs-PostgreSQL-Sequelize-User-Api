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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  userLogin(@Body() loginDto: Record<string, string>) {
    return this.authService.userLogin(loginDto.email, loginDto.password);
  }

  @UseGuards(AuthGuardian)
  @Get('profile')
  getProfile(@Request() request) {
    return request.user;
  }
}
