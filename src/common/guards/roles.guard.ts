import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
     
      if (!requiredRoles) {
        return true;
      }
      
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
          throw new UnauthorizedException({
              message: "Foydalanuvchi autorizatsiyadan o'tmagan",
            });
          }
          
      const user = this.jwtService.verify(token, {
        publicKey: process.env.ACCESS_TOKEN_KEY,
      });
      req.user = user;

      for (let i of requiredRoles) if (user.role === i) return true;

      return false;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Ruxsat etilmagan foydalanuvchi',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
