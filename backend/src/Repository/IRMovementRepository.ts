import {IRMovement} from 'protocol';
import table from '../database/connection';
import DateManipulator from '../utils/DateManipulator';

type DBIRMovement = {
  date: string,
  ticker: string,
  value: number,
  profit: number,
}

const conversor = {
  toDB: (ir: IRMovement): DBIRMovement => ({
    ...ir,
    date: DateManipulator.dateToISOString(ir.date),
  }),
  fromDB: (db: DBIRMovement): IRMovement => ({
    ...db,
    date: DateManipulator.isoStringToDate(db.date),
  }),
};

class IRMovementRepository {
  async all(): Promise<IRMovement[]> {
    const db = await table('ir_movement')
      .select('*')
      .orderBy(['date', 'ticker']);
    return db.map(conversor.fromDB);
  }

  async save(ir: IRMovement) {
    const record = conversor.toDB(ir);
    await table('ir_movement').insert(record);
  }
}

export default new IRMovementRepository();