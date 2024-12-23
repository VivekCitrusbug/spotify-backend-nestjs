import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { updateEmployeeDto } from './dto/update-employee.dto';
import { ApiError } from 'src/common/errors/ApiError';
@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: DatabaseService) {}

  //create new user:
  async createEmployee(data: CreateEmployeeDto) {
    //check duplicate user with same email:
    const duplicate = await this.prisma.employee.findUnique({
      where: {
        email: data.email,
      },
    });
    if (duplicate) throw new ApiError(409, 'email already registered!!!');
    const employee = await this.prisma.employee.create({
      data: data,
    });

    if (!employee) throw new ApiError(500, 'Failed to crate new employee!!!');

    return employee;
  }

  //get all user registered:
  async getAll() {
    const data = await this.prisma.employee.findMany();
    if (!data.length) throw new ApiError(404, 'employees not found!!!');
    return data;
  }

  //deleteEmployee
  async deleteEmployee(id) {
    const data = await this.prisma.employee.findUnique({
      where: {
        id,
      },
    });
    if (!data)
      throw new ApiError(404, 'employees not found or deleted already.!!!');
    await this.prisma.employee.delete({
      where: { id },
    });
    return data;
  }

  //updateEmployee
  async updateEmployee(id: number, data: updateEmployeeDto) {
    const employee = await this.prisma.employee.findUnique({
      where: {
        id,
      },
    });
    if (!data) throw new ApiError(404, 'employees not found!!!');
    const newData = await this.prisma.employee.update({
      where: { id },
      data: data,
    });

    return newData;
  }
}
