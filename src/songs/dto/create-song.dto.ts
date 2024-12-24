import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsArray,
  ArrayNotEmpty,
  IsDate,
  IsISO8601,
  ArrayMaxSize,
  IsPositive,
  Min,
  Max,
  Validate,
  IsDateString,
  IsMilitaryTime,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @MaxLength(100, { message: 'Title must not exceed 100 characters' })
  title: string;

  @IsArray({ message: 'Artists must be an array of strings' })
  @ArrayNotEmpty({ message: 'Artists array cannot be empty' })
  @MaxLength(50, {
    each: true,
    message: 'Each artist name must not exceed 50 characters',
  })
  artists: string[];

  @IsNotEmpty({ message: 'Release date cannot be empty' })
  @IsDateString()
  releaseDate: Date; //2020-09-28

  @IsMilitaryTime()
  @IsNotEmpty({ message: 'duration cannot be empty' })
  duration: Date; //02:30
}
