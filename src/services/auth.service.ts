import { Injectable, UnauthorizedException } from '@nestjs/common';
import UserDao from '../daos/user.dao';
import Constant from '../helpers/constant.helper';

@Injectable()
export default class AuthAdminService {
    constructor(private _userDao: UserDao) { }

    public async validateAdminToken(token: string, roleId: number = Constant.ROLE_ADMIN): Promise<boolean> {
        if (!Constant.TOKEN_REGEX.test(token)) {
            throw new UnauthorizedException();
        }
        const tokenWithOutBearer = token.replace('Bearer', '')
        const user = await this._userDao.getUserByToken(tokenWithOutBearer.trim(), roleId);
        if (user) return true;
        throw new UnauthorizedException();
    }
}
