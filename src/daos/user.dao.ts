import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class UserDao {
  constructor(
    @InjectRepository(User)
    private _userRepository: Repository<User>
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    return await this._userRepository.findOne({
      where: { email: email, enabled: true }
    });
  }

  async createUser(user: User) {
    return await this._userRepository.insert(user);
  }

  async getUserByToken(token: string, roleId: number) {
    return await this._userRepository.findOne({
      where: { token: token, roleId: roleId, enabled: true }
    });
  }
}
