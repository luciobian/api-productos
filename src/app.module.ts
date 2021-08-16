import { Module } from '@nestjs/common';
import ProductController from './controllers/product.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ProductService from './services/product.service';
import ProductHandler from './handlers/product.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envFilePathConfiguration } from './config/env.config';
import { getConnectionOptions } from 'typeorm';
import { nestEnvConfiguration } from './config/load.env.config';
import { ProductModule } from './modules/product/product.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './middlewares/logger.middleware';
import { UserModule } from './modules/user/user.module';
import { UserController } from './controllers/user.controller';
import TaxDao from './daos/tax.dao';
import ProductDao from './daos/product.dao';
import TaxService from './services/tax.service';
import UserHandler from '../src/handlers/user.handler';
import UserService from '../src/services/user.service';
import UserDao from '../src/daos/user.dao';
import AuthAdminService from './services/auth.service';
import { AuthAdminGuard } from './helpers/guards/authorization.guard';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [envFilePathConfiguration()],
      load: [nestEnvConfiguration],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return Object.assign(await getConnectionOptions(), config.get('DATABASE'));
      }
    }),
    ProductModule,
    UserModule,
    AuthModule
  ],
  controllers: [ProductController, UserController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    ProductHandler,
    ProductService,
    ProductDao,
    TaxDao,
    TaxService,
    UserHandler,
    UserService,
    UserDao,
    AuthAdminGuard, 
    AuthAdminService
  ]
})
export default class AppModule {}
