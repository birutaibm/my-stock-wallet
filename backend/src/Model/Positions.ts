import {Position, Positions} from 'protocol';

const positions:Positions = {
  HGTX3: [{
    ticker: "HGTX3",
    quantity: 116,
    price: -251880,
  }],
};

export default {
  getPositions():Position[] {
    return Object.values(positions).map(pos => pos[pos.length - 1]);
  },
  getPosition(ticker: string): Position | undefined {
    const position = positions[ticker];
    return (position) ? position[position.length - 1] : undefined;
  },
  setPosition(position: Position) {
    if (!positions[position.ticker]) {
      positions[position.ticker] = [];
    }
    positions[position.ticker].push(position);
  }
};