import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsPositive,
  IsDateString,
  IsMilitaryTime,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @MaxLength(100, { message: 'Title must not exceed 100 characters' })
  title: string;

  @IsNotEmpty({ message: 'User ID is required' })
  @IsPositive({ message: 'User ID must be a positive number' })
  @Type(() => Number) // Ensures that userId is cast to a number
  userId: number;

  @IsOptional()
  @IsNotEmpty({ message: 'Release date cannot be empty' })
  @IsDateString(
    {},
    {
      message:
        'Release date must be a valid ISO 8601 date string (e.g., 2024-12-23)',
    },
  )
  @Type(() => Date) // Converts releaseDate to a Date object
  releaseDate?: Date;

  @IsNotEmpty({ message: 'Duration cannot be empty' })
  @IsMilitaryTime({ message: 'Duration must be in HH:mm format (e.g., 02:30)' }) // Validates military time format
  duration: string; // Changed to string to match the `time` type in the database
}
