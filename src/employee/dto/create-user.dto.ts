import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Role } from '@prisma/client';
import { DeepPartial } from 'typeorm';

export class CreateUserDto {
  @IsString()
  @MinLength(1, { message: 'Name must have at least one character.' })
  @MaxLength(50, { message: 'Name must not exceed 50 characters.' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9_])[a-zA-Z0-9_]+$/, {
    message:
      'Name must contain at least one letter, one number or underscore (_), but cannot be all numbers.',
  })
  name: string;

  @IsEmail({}, { message: 'Invalid email format.' })
  email: string;

  @IsEnum(Role, {
    message: 'Role must be either user, admin, or doctor.',
  })
  @IsOptional() // The role is optional and defaults to 'user'
  role: DeepPartial<Role>;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  @MaxLength(20, { message: 'Password must not exceed 20 characters.' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  )
  password: string;
}
