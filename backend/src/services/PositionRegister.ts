import DB from '../Model';
import {Position} from 'protocol';

class PositionRegister {
  registry(position: Position) {
    const found = DB.getPosition(position.ticker);
    if (found) {
      position.price += found.price;
      position.quantidy += found.quantidy;
    }
    DB.setPosition(position);
    return DB.getPositions();
  }
}

export default new PositionRegister();