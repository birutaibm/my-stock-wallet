import {IRMovement} from 'protocol';

const movements:IRMovement[] = [];

export default {
  getIRMovements() {
    return movements;
  },
  addIRMovement(movement: IRMovement) {
    movements.push(movement);
  }
};