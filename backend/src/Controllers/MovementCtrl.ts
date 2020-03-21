import { Request, Response } from 'express';
import {Movement} from 'protocol';
import DB from '../Model';

class MovementCtrl {
  public async index(req: Request, res: Response<Movement[]>) {
    const moves = DB.getMovements();
    return res.json(moves);
  }
}

export default new MovementCtrl();