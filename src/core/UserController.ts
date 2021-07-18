import { Request, Response } from 'express';
import { Controller, Get } from './decorators/express';

@Controller('/users')
export class UserController {
  @Get('/all')
  async getAll(_req: Request, res: Response): Promise<void> {
    res.json({ ok: true });
  }

  @Get('/:id')
  async getById(req: Request, res: Response): Promise<void> {
    res.json({ id: req.params['id'] });
  }
}
