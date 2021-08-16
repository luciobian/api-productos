import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import AuthAdminService from '../../services/auth.service';

@Injectable()
export class AuthAdminGuard implements CanActivate {
  constructor(private _authService: AuthAdminService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const existAuthorization = Boolean(request.headers['authorization']);
    if(existAuthorization){
      return await this._authService.validateAdminToken(request.headers['authorization']);
    }
    throw new UnauthorizedException()
  }
}
