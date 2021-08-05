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
import TaxDao from './daos/tax.dao';
import ProductDao from './daos/product.dao';
import TaxService from './services/tax.service';

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
        return Object.assign(
          await getConnectionOptions(),
          config.get('DATABASE')
        );
      }
    }),
    ProductModule
  ],
  controllers: [ProductController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    ProductHandler,
    ProductService,
    ProductDao,
    TaxDao,
    TaxService
  ]
})
export default class AppModule {}
