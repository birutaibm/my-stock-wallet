import { Request, Response } from 'express';
import {Position} from 'protocol';
import PositionRegister from '../services/PositionRegister';
import table from '../database/connection';
import DateManipulator from '../utils/DateManipulator';
import Repository from '../Repository/PositionRepository';

type DBPosition = {
  ticker: string,
  date: string,
  quantity: number,
  price: number
}

class PositionCtrl {
  public async index(req: Request, res: Response<Position[]>) {
    const filtered = await Repository.getFromDate(null);
    return res.json(filtered);
  }

  public async store(req: Request, res: Response) {
    const position:Position = req.body;
    await Repository.save(position);
    return res.sendStatus(201);
  }
}

export default new PositionCtrl();