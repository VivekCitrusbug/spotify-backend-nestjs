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
import { UserEntity } from './entity/user.entity';
import { SongEntity } from './entity/song.entity';
import { SongsModule } from './songs/songs.module';
@Module({
  imports: [
    UserModule,
    CommonModule,
    SongsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Citrusbug',
      database: 'nest_entity_db',
      entities: [UserEntity, SongEntity],
      synchronize: true,
    }),
  ],
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
