import {Movement} from 'protocol';

const movements:Movement[] = [{
  date: {
    year: 2020,
    month: 3,
    day: 3,
  },
  direction: 'Buy',
  ticker: "HGTX3",
  quantity: 43,
  price: -100006,
}];

export default {
  getMovements() {
    return movements;
  },
  saveMovement(movement: Movement) {
    movements.push(movement);
  }
};