import { CreateEmployeeDto } from './create-employee.dto';
import { PartialType } from '@nestjs/mapped-types';

export class updateEmployeeDto extends PartialType(CreateEmployeeDto) {}
