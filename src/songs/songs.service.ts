import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { SongEntity } from 'src/entity/song.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { ApiError } from 'src/common/errors/ApiError';
import { DeepPartial } from 'typeorm';
@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(SongEntity)
    private readonly songRepository: Repository<SongEntity>,
  ) {}

  //createUser:
  async createSong(data: CreateSongDto) {
    try {
      // Validate email uniqueness
      const existingSong = await this.songRepository.findOne({
        where: { title: data.title },
      });
      if (existingSong) {
        throw new ApiError(400, 'song already exists');
      }

      const newSong = this.songRepository.create(
        data as DeepPartial<SongEntity>,
      ); // Create a new User instance
      return await this.songRepository.save(newSong); // Save the User in the database
    } catch (error) {
      // Throw an ApiError with additional context if necessary
      throw new ApiError(error.statusCode, error.message);    }
  }
  //getAllUsers
  // Get all users with their songs
  async getAllSong(): Promise<SongEntity[]> {
    try {
      return await this.songRepository.find({ relations: ['user'] }); // Fetch users and their related songs
    } catch (error) {
      throw new ApiError(error.statusCode, error.message);    }
  }
  //updateUser
  async updateUser() {}
  //deleteUser
  async deleteUser() {}
}
