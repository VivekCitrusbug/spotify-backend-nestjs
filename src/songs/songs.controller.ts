import { updateSongDto } from './dto/update-song.dto';
import { CreateSongDto } from './dto/create-song.dto';
import { SongsService } from './songs.service';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Res,
  } from '@nestjs/common';
  import { Response } from 'express';
  @Controller('employee')
  export class EmployeeController {
    constructor(private readonly songService: SongsService) {}
  
    @Get()
    getAll() {
      return this.songService.getAll();
    }
  
    @Post()
    createSong(@Body() data: CreateSongDto) {
      return this.songService.createSong(data);
    }
  
    @Patch(':id')
    updateSong(@Body() data: updateSongDto, @Param('id') id: number) {
      return this.songService.updateSong(id, data);
    }
  
    @Delete(':id')
    deleteSong(@Param('id') id: number) {
      return this.songService.deleteSong(id);
    }
  }
  