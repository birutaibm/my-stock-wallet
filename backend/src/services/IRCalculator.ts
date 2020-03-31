import {Movement, Position, IRMovement} from 'protocol';

class IRCalculator {
  calcMovement(position: Position, move: Movement): IRMovement {
    const profit = move.price - (move.quantity * position.price / position.quantity);
    const ir: IRMovement = {
      date: move.date,
      ticker: move.ticker,
      value: move.price,
      profit,
    };
    return ir;
  }
}

export default new IRCalculator();