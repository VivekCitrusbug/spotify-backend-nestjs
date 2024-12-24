/**
 * below the code is used as service when using prisma orm not Typeor
 */
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { ApiError } from 'src/common/errors/ApiError';
@Injectable()
export class UserService {
  constructor(private readonly prisma: DatabaseService) {}

  //create new user:
  async createUser(data: CreateUserDto) {
    //check duplicate user with same email:
    const duplicate = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (duplicate) throw new ApiError(409, 'email already registered!!!');
    const user = await this.prisma.user.create({
      data: data,
    });

    if (!user) throw new ApiError(500, 'Failed to crate new user!!!');

    return user;
  }

  //get all user registered:
  async getAll() {
    const data = await this.prisma.user.findMany();
    if (!data.length) throw new ApiError(404, 'user not found!!!');
    return data;
  }

  //deleteEmployee
  async deleteUser(id) {
    const data = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!data) throw new ApiError(404, 'user not found or deleted already.!!!');
    await this.prisma.user.delete({
      where: { id },
    });
    return data;
  }

  //updateEmployee
  async updateUser(id: number, data: updateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!data) throw new ApiError(404, 'user not found!!!');
    const newData = await this.prisma.user.update({
      where: { id },
      data: data,
    });

    return newData;
  }
}
