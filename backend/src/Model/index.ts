import Movements from './Movements';
import Positions from './Positions';
import IR from './IR';
import Note from './Note';

export default {
  ...Movements,
  ...Positions,
  ...IR,
  ...Note,
};