import { Request, Response } from 'express';
import {IRMovement} from 'protocol';
import IRMovements from '../Repository/IRMovementRepository';

class IRCtrl {
  public async index(req: Request, res: Response<IRMovement[]>) {
    const moves = await IRMovements.all();
    return res.json(moves);
  }
}

export default new IRCtrl();