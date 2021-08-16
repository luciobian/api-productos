import { Module } from '@nestjs/common';
import AuthAdminService from '../../../src/services/auth.service';
import { AuthAdminGuard } from '../../helpers/guards/authorization.guard';
import { UserModule } from '../user/user.module';
import UserDao from '../../../src/daos/user.dao';

@Module({
    imports: [UserModule],
    providers: [AuthAdminService, AuthAdminGuard, UserDao],
    exports: [AuthAdminGuard]
  })
export class AuthModule {}
