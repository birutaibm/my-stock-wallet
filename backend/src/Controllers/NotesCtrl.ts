import { Request, Response } from 'express';
import {Position, BrokerageNote, ErrorMessage} from 'protocol';
import DB from '../Model';
import NoteRegister from '../services/NoteRegister';

class NotesCtrl {
  public async index(req: Request, res: Response<BrokerageNote[] | ErrorMessage>) {
    const notes = DB.getNotes();
    return res.json(notes);
  }

  public async store(req: Request, res: Response<BrokerageNote[] | ErrorMessage>) {
    const note:BrokerageNote = req.body;
    try {
      const notes = NoteRegister.registry(note);
      return res.json(notes);
    } catch (error) {
      if (error instanceof Error) {
        const {message} = error;
        return res.status(422).json({message});
      } else {
        return res.status(500).json({message: "Unknown Error"});
      }
    }
  }
}

export default new NotesCtrl();