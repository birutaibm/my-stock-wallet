import {Position, Date} from 'protocol';
import DateManipulator from '../utils/DateManipulator';
import table from '../database/connection';

type DBPosition = {
  ticker: string;
  date?: string;
  quantity: number;
  price: number;
}

type RestrictedDBPosition = DBPosition & {
  date: string;
}

const PositionConversor = {
  fromDB: (db: RestrictedDBPosition): Position => ({
    ...db,
    date: DateManipulator.isoStringToDate(db.date)
  }),

  toDB: (pos: Position): DBPosition => (
    pos.date ? {
      ...pos,
      date: DateManipulator.dateToISOString(pos.date)
    } : pos as DBPosition
  )
};

class PositionRepository {
  async getFromTicker(ticker: string): Promise<Position[]> {
    const positions: RestrictedDBPosition[] = await table('positions')
      .select('*')
      .where('ticker', ticker)
      .orderBy('date');
    return positions.map(pos => PositionConversor.fromDB(pos));
  }

  async getFromTickerAndDate(ticker: string, date: Date | null): Promise<Position | undefined> {
    const positions: RestrictedDBPosition[] = (date !== null) ?
      await table('positions')
        .select('*')
        .where('ticker', ticker)
        .andWhere('date', '<=', DateManipulator.dateToISOString(date))
        .orderBy('date') :
      await table('positions')
        .select('*')
        .where('ticker', ticker)
        .orderBy('date');
    if (positions.length > 0) {
      const pos = positions[positions.length - 1];
      return PositionConversor.fromDB(pos);
    }
    return undefined;
  }

  async getFromDate(date: Date | null): Promise<Position[]> {
    const fromSQL = date ?
      await table('positions')
        .select('*')
        .where('date', '<=', DateManipulator.dateToISOString(date))
        .orderBy(['ticker', 'date']) :
      await table('positions')
        .select('*')
        .orderBy(['ticker', 'date']);
    const filtered = fromSQL.reverse().reduce((result, value) => {
      if (result.length) {
        if (value.ticker !== result[result.length-1].ticker) {
          return [...result, value];
        } else {
          return result;
        }
      } else {
        return [value];
      }
    }, []).reverse().map(PositionConversor.fromDB);
    return filtered;
  }

  async save(position: Position) {
    const found = await this.getFromTickerAndDate(position.ticker, null);
    if (found) {
      position.price += found.price;
      position.quantity += found.quantity;
    }
    const record = PositionConversor.toDB(position);
    return await table('positions').insert(record);
  }
}

export default new PositionRepository();