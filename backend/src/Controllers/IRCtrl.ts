import { Request, Response } from 'express';
import {IRMovement} from 'protocol';
import DB from '../Model';

class IRCtrl {
  public async index(req: Request, res: Response<IRMovement[]>) {
    const moves = DB.getIRMovements();
    return res.json(moves);
  }
}

export default new IRCtrl();