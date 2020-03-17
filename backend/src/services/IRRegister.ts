import {Movement, Position, IRMovement} from 'protocol';
import DB from '../Model';

export default class MovementRegister {
 
  registry(position: Position, move: Movement) {
    const profit = move.price - (move.quantidy * position.price / position.quantidy);
    const ir: IRMovement = {
      date: move.date,
      ticker: move.ticker,
      value: move.price,
      profit,
    };
    DB.addIRMovement(ir);
    return ir;
  }
}