import { Request, Response } from 'express';
import {Position, BrokerageNote} from 'protocol';
import NoteRegister from '../services/NoteRegister';

export default {
  async store(req: Request, res: Response<Position[]>) {
    const note:BrokerageNote = req.body;
    const positions = new NoteRegister().registry(note);
    return res.json(positions);
  }
}