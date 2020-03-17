import {Movement as MovementType, Position} from 'protocol';
import DB from '../Model';
import IRRegister from './IRRegister';

export default class MovementRegister {
  private addMoveToPosition(move: MovementType, position?: Position) {
    if (position) {
      DB.setPosition({
        ...position,
        price: position.price + move.price,
        quantidy: position.quantidy + move.quantidy,
      });
    } else {
      DB.setPosition(move);
    }
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