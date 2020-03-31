import {Movement as MovementType, Position} from 'protocol';
import DB from '../Model';
import { ShortPositionNotSupported } from '../Errors';
import IRCalculator from './IRCalculator';
import IRMovements from '../Repository/IRMovementRepository';
import Positions from '../Repository/PositionRepository';

class MovementRegister {
  private addMoveToPosition(move: MovementType, position?: Position) {
    const newPosition: Position = {
      ticker: move.ticker,
      quantity: move.quantity,
      price: move.price,
      date: move.date,
    };
    if (position) {
      newPosition.quantity += position.quantity;
      if (move.direction === 'Buy') {
        newPosition.price += position.price;
      } else {
        newPosition.price = (position.price / position.quantity) * newPosition.quantity;
      }
    } else if (move.direction === 'Sell') {
      ShortPositionNotSupported();
    }
    Positions.save(newPosition);
  }

  async registry(move: MovementType) {
    const movements = DB.getMovements();
    movements.push(move);
    const position = await Positions.getFromTickerAndDate(move.ticker, null);
    if (position && (move.direction === 'Sell')) {
      const ir = IRCalculator.calcMovement(position, move);
      IRMovements.save(ir);
    }
    this.addMoveToPosition(move, position);
    DB.saveMovement(move);
    return DB.getMovements();
  }
}

export default new MovementRegister();