import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../models/entities/user.entity';
import { Role } from '../../models/entities/role.entity';
import { UserController } from '../../controllers/user.controller';
import UserHandler from '../../../src/handlers/user.handler';
import UserDao from '../../../src/daos/user.dao';
import UserService from '../../../src/services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UserHandler, UserService, UserDao],
  controllers: [UserController],
  exports: [TypeOrmModule]
})
export class UserModule {}
