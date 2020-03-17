import DB from '../Model/Positions';
import {Position} from 'protocol';

export default class BuySellRegistry {
  registry(position: Position) {
    const positions = DB.getPositions();
    const found = positions
      .find(candidate => candidate.ticker === position.ticker);
    if (found) {
      found.price += position.price;
      found.quantidy += position.quantidy;
    } else {
      positions.push(position);
    }
    return positions;
  }
}