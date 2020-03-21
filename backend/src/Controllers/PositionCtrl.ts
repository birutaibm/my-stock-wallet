import { Request, Response } from 'express';
import {Position} from 'protocol';
import DB from '../Model/Positions';
import PositionRegister from '../services/PositionRegister';

class PositionCtrl {
  public async index(req: Request, res: Response<Position[]>) {
    const positions = DB.getPositions()
    return res.json(positions);
  }

  public async store(req: Request, res: Response<Position[]>) {
    const position:Position = req.body;
    const positions = PositionRegister.registry(position);
    return res.json(positions);
  }
}

export default new PositionCtrl();