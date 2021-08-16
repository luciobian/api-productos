import { Body, Controller, Get, Post } from '@nestjs/common';
import UserHandler from '../../src/handlers/user.handler';
import LoginRequest from '../../src/models/requests/user-controller/user-login.request';
import HelperFormat from '../helpers/format.helper';
import RegisterRequest from '../models/requests/user-controller/register.request';

@Controller('users')
export class UserController {
  constructor(private _userHandler: UserHandler) {}

  @Get('/admin/token')
  async getToken(@Body() loginRequest: LoginRequest) {
    let response = await this._userHandler.getToken(loginRequest);
    return HelperFormat.response(response);
  }

  @Post('/admin/register')
  async createAdmin(@Body() registerRequest: RegisterRequest) {
    let response = await this._userHandler.createUser(registerRequest);
    return HelperFormat.response(response);
  }
}
