import { Request, Response } from 'express';
import {Position, BrokerageNote, ErrorMessage} from 'protocol';
import NoteRegister from '../services/NoteRegister';

export default {
  async store(req: Request, res: Response<Position[] | ErrorMessage>) {
    const note:BrokerageNote = req.body;
    try {
      const positions = new NoteRegister().registry(note);
      return res.json(positions);
      
    } catch (error) {
      if (error instanceof Error) {
        const {message} = error;
        return res.sendStatus(422).json({message});
      } else {
        return res.sendStatus(500).json({message: "Unknown Error"});
      }
    }
  }
}