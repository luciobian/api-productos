import { Injectable } from '@nestjs/common';
import userLoginRequest from 'src/models/requests/user-controller/user-login.request';
import UserService from '../../src/services/user.service';
import LoginResponse from '../../src/models/responses/user-controller/login.response';
import registerRequest from 'src/models/requests/user-controller/register.request';
import RegisterResponse from '../models/responses/user-controller/register.response';

@Injectable()
export default class UserHandler {
  constructor(private _userService: UserService) {}

  async getToken(loginRequest: userLoginRequest): Promise<LoginResponse> {
    return await this._userService.getToken(loginRequest);
  }
  async createUser(registerRequest: registerRequest): Promise<RegisterResponse> {
    return await this._userService.createUser(registerRequest);
  }
}
