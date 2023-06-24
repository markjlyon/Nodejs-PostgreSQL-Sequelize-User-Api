import {
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants/jwt.constants';

/**
 * AuthGuardian class for adding Guards to Authentication and with JWTService
 * @date 6/24/2023
 *
 * @export
 * @class AuthGuardian
 * @typedef {AuthGuardian}
 * @implements {CanActivate}
 */
@Injectable()
export class AuthGuardian implements CanActivate {
  /**
   * Creates an instance of AuthGuardian.
   * @date 6/24/2023
   *
   * @constructor
   * @param {JwtService} jwtService
   */
  constructor(private jwtService: JwtService) {}

  /**
   * Verify if request has valid JWT token
   * @date 6/24/2023
   *
   * @async
   * @param {ExecutionContext} context
   * @returns {Promise<boolean>}
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  /**
   * Get the JWT token from the request header
   * @date 6/24/2023
   *
   * @private
   * @param {Request} request
   * @returns {(string | undefined)}
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization'].split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
