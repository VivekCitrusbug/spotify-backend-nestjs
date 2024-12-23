import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { EmployeeController } from './employee/employee.controller';

@Module({
  imports: [EmployeeModule, DatabaseModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('employee');    option 1

    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'employee', method: RequestMethod.POST });  option 2

    consumer.apply(LoggerMiddleware).forRoutes(EmployeeController);
  }
}
