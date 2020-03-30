import {Position} from 'protocol';
import DateManipulator from '../utils/DateManipulator';
import DB from '../Model';
import table from '../database/connection';

class PositionRegister {
  async registry(position: Position) {
    const found = DB.getPosition(position.ticker);
    if (found) {
      position.price += found.price;
      position.quantity += found.quantity;
    }
    DB.setPosition(position);
    const record = position.date ? {
      ...position,
      date: DateManipulator.dateToISOString(position.date)
    } : {...position};
    await table('positions').insert(record);
    return DB.getPositions();
  }
}

export default new PositionRegister();