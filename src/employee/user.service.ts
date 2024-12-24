import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { SongEntity } from 'src/entity/song.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiError } from 'src/common/errors/ApiError';
import { updateSongDto } from 'src/songs/dto/update-song.dto';
import { updateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  //createUser:
  async createUser(data: CreateUserDto) {
    try {
      // Validate email uniqueness
      const existingUser = await this.userRepository.findOne({
        where: { email: data.email },
      });
      if (existingUser) {
        throw new ApiError(400, 'Email already exists');
      }

      const newUser = this.userRepository.create(
        data as DeepPartial<UserEntity>,
      ); // Create a new User instance
      return await this.userRepository.save(newUser); // Save the User in the database
    } catch (error) {
      // Throw an ApiError with additional context if necessary
      throw new ApiError(error.statusCode, error.message);
    }
  }
  //getAllUsers
  // Get all users with their songs
  async getAllUsers(): Promise<UserEntity[]> {
    try {
      const data = await this.userRepository.find({ relations: ['songs'] }); // Fetch users and their related songs
      if (!data.length) throw new ApiError(404, 'user not found!!!');
      return data;
    } catch (error) {
      throw new ApiError(error.statusCode, error.message);
    }
  }
  // updateUser
  async updateUser(id: number, data: updateUserDto) {
    try {
      const existsUser = await this.userRepository.findOneBy({ id });
      if (!existsUser) throw new ApiError(404, 'user not found!!!');
      await this.userRepository.update(id, data as DeepPartial<UserEntity>);
      return await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new ApiError(error.statusCode, error.message);
    }
  }

  //deleteUser
  async deleteUser(id: number) {
    try {
      const existsUser = await this.userRepository.findOneBy({ id });
      if (!existsUser) throw new ApiError(404, 'User not found');
      await this.userRepository.delete(id);

      return existsUser;
    } catch (error) {
      throw new ApiError(error.statusCode, error.message);
    }
  }
}
