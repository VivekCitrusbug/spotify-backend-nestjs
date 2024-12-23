export class ApiError extends Error {
  statusCode: number;
  message: string;
  data?: any;
  success?: boolean;
  errors?: any[];

  constructor(
    statusCode: number = 500,
    message: string = 'Internal Server Error!!!',
    success: boolean = false,
    data: any = null,

    errors: any[] = [],
    stack: string | undefined = '',
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.errors = errors;
    this.success = success;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
