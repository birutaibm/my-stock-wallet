import {Movement as MovementType, Position} from 'protocol';
import DB from '../Model';
import { ShortPositionNotSupported } from '../Errors';
import IRRegister from './IRRegister';

export default class MovementRegister {
  private addMoveToPosition(move: MovementType, position?: Position) {
    const newPosition: Position = {
      ticker: move.ticker,
      quantidy: move.quantidy,
      price: move.price,
    };
    if (position) {
      newPosition.quantidy += position.quantidy;
      if (move.direction === 'Buy') {
        newPosition.price += position.price;
      } else {
        newPosition.price = (position.price / position.quantidy) * newPosition.quantidy;
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
      new IRRegister().registry(position, move);
    }
    this.addMoveToPosition(move, position);
    DB.saveMovement(move);
  }
}