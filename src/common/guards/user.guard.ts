import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtUserGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException('Authorization is not active');
      }
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'Token is not exists',
        });
      }
      const user = this.jwtService.verify(token, {
        publicKey: process.env.ACCESS_TOKEN_KEY,
      });
      if (!user.sub) {
        throw new UnauthorizedException('User is unauthorized');
      }
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
