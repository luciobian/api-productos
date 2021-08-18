import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import LoginResponse from '../../src/models/responses/user-controller/login.response';
import userLoginRequest from 'src/models/requests/user-controller/user-login.request';
import UserDao from '../../src/daos/user.dao';
import HelperConverter from '../helpers/converter.helper';
import * as bcrypt from 'bcrypt';
import RegisterRequest from '..//models/requests/user-controller/register.request';
import RegisterResponse from '../models/responses/user-controller/register.response';

@Injectable()
export default class UserService {
  constructor(private _userDao: UserDao) {}

  async getToken(loginRequest: userLoginRequest): Promise<LoginResponse> {
    try {
      const user = await this._userDao.getUserByEmail(loginRequest.email);
      if (user && (await bcrypt.compare(loginRequest.password, user.password))) {
        const response = HelperConverter.loginResponse(user);
        return response;
      }
      throw new UnauthorizedException(`Email y/o contraseña inválido.`);
    } catch (error) {
      throw error;
    }
  }

  async createUser(registerRequest: RegisterRequest): Promise<RegisterResponse> {
    let userDao = await this._userDao.getUserByEmail(registerRequest.email);
    if (userDao) {
      throw new BadRequestException(`El email ${registerRequest.email} ya está en uso.`);
    }
    let user = HelperConverter.registerRequestToUser(registerRequest);
    await this._userDao.createUser(user);
    let response = HelperConverter.registerResponse(user);
    return response;
  }
}
