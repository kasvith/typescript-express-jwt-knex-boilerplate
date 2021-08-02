import { Request, Response } from 'express';
import { ApiController, ApiVersion } from '@decorators/express';
import { Get } from './decorators/express/http';

interface MessageResponse {
  message: string;
}

interface User {
  id: string;
}

@ApiController('/users')
@ApiVersion('1.0')
@ApiVersion('2.0')
export class UserController {
  @Get('/all')
  async getAll(_req: Request, res: Response): Promise<MessageResponse> {
    res.status(201);
    return { message: 'ok' };
  }

  @Get('/abc/:id')
  getById(req: Request, _res: Response): User {
    return { id: req.params.id };
  }
}
