import { Request, Response } from 'express';
import {Position} from 'protocol';
import DB from '../Model/Positions';
import BuySell from '../services/BuySellRegistry';

export default {
  async index(req: Request, res: Response) {
    const positions = DB.getPositions()
    return res.json(positions);
  },
  async store(req: Request, res: Response<Position[]>) {
    const position:Position = req.body;
    const positions = new BuySell().registry(position);
    return res.json(positions);
  }
}