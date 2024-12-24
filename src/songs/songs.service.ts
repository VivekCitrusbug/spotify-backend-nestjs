import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateSongDto } from './dto/create-song.dto';
import { ApiError } from 'src/common/errors/ApiError';
import { updateSongDto } from './dto/update-song.dto';

@Injectable()
export class SongsService {

    constructor(private readonly prisma: DatabaseService) {}

  //create new user:
  async createSong(data: CreateSongDto) {
    //check duplicate user with same email:
    const duplicate = await this.prisma.song.findUnique({
      where: {
        title: data.title,
      },
    });
    if (duplicate) throw new ApiError(409, 'title already registered!!!');
    const song = await this.prisma.song.create({
     data
    });

    if (!song) throw new ApiError(500, 'Failed to crate new song!!!');

    return song;
  }

  //get all user registered:
  async getAll() {
    const data = await this.prisma.song.findMany();
    if (!data.length) throw new ApiError(404, 'song not found!!!');
    return data;
  }

  //deleteEmployee
  async deleteSong(id) {
    const data = await this.prisma.song.findUnique({
      where: {
        id,
      },
    });
    if (!data)
      throw new ApiError(404, 'song not found or deleted already.!!!');
    await this.prisma.song.delete({
      where: { id },
    });
    return data;
  }

  //updateEmployee
  async updateSong(id: number, data: updateSongDto) {
    const song = await this.prisma.song.findUnique({
      where: {
        id,
      },
    });
    if (!data) throw new ApiError(404, 'song not found!!!');
    const newData = await this.prisma.song.update({
      where: { id },
      data: data,
    });

    return newData;
  }

}
