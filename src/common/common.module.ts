import { Module } from '@nestjs/common';
import { CustomExceptionFilter } from './errors/customExceptionFilter';
import { APP_FILTER } from '@nestjs/core';
@Module({
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: CustomExceptionFilter,
    },
  ],
})
export class CommonModule {}
