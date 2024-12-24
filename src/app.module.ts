import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './employee/user.module';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { UserController } from './employee/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UserModule, DatabaseModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('employee');    option 1

    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'employee', method: RequestMethod.POST });  option 2

    consumer.apply(LoggerMiddleware).forRoutes(UserController);
  }
}
