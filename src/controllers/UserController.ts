import { Request, Response } from 'express';
import { ApiController, ApiVersion } from '@decorators/express';
import { Get } from '@decorators/express';
import { inject, injectable } from 'inversify';
import { Test } from '@/Test';

interface MessageResponse {
  message: string;
}

interface User {
  id: string;
}

@ApiController('/users')
@ApiVersion('v1')
@injectable()
export class UserController {
  constructor(@inject(Test) private test: Test) {
    console.log(`test is ${test}`);
  }

  @Get('/all')
  async getAll(_req: Request, res: Response): Promise<MessageResponse> {
    res.status(201);
    return { message: this.test.message() };
  }

  @Get('/abc/:id')
  getById(req: Request, _res: Response): User {
    return { id: req.params.id };
  }
}
