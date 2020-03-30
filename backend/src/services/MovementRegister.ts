import {Movement as MovementType, Position} from 'protocol';
import DB from '../Model';
import { ShortPositionNotSupported } from '../Errors';
import IRRegister from './IRRegister';

class MovementRegister {
  private addMoveToPosition(move: MovementType, position?: Position) {
    const newPosition: Position = {
      ticker: move.ticker,
      quantity: move.quantity,
      price: move.price,
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
    DB.setPosition(newPosition);
  }

  registry(move: MovementType) {
    const movements = DB.getMovements();
    movements.push(move);
    const position = DB.getPosition(move.ticker);
    if (position && (move.direction === 'Sell')) {
      IRRegister.registry(position, move);
    }
    this.addMoveToPosition(move, position);
    DB.saveMovement(move);
    return DB.getMovements();
  }
}

export default new MovementRegister();