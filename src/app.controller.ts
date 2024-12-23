import { All, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiError } from './common/errors/ApiError';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()

  // handle global not found routes:
  @All('*')
  async notFound(): Promise<void> {
    throw new ApiError(404, 'Page Not Found!!!');
  }
}
