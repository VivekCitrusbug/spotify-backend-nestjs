import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongController } from './songs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongEntity } from 'src/entity/song.entity';
import { UserEntity } from 'src/entity/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, SongEntity])],
  controllers: [SongController],
  providers: [SongsService],
})
export class SongsModule {}
