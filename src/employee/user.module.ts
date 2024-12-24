import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { SongEntity } from 'src/entity/song.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, SongEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
