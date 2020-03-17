import DB from '../Model/Positions';
import {BrokerageNote, BrokerageNoteItem, Movement, Date} from 'protocol';
import MovementRegister from './MovementRegister';
import {sum} from '../utils';

export default class NoteRegister {
  private createMovement(date: Date, item:BrokerageNoteItem): Movement {
    const quantidy = (item.direction === 'Buy') ? 
      Math.abs(item.quantidy) : 
      - Math.abs(item.quantidy);
    const price = (item.direction === 'Buy') ? (
      - Math.abs(item.unitPrice * quantidy)
    ) : (
      Math.abs(item.unitPrice * quantidy)
    );
    return {
      date,
      ticker: item.ticker,
      direction: item.direction,
      quantidy,
      price,
    }
  }

  private groupMoves(moves: Movement[]) {
    const result: {[key: string]: Movement[]} = {};
    moves.forEach(move => {
      if (!result[move.ticker]) {
        result[move.ticker] = [];
      }
      result[move.ticker].push(move);
    });
    return result;
  }

  private joinMoves(moves: Movement[]): Movement | undefined {
    const result = moves.shift();
    if (result) {
      moves.forEach(move => {
        result.quantidy += move.quantidy;
        result.price += move.price;
        result.direction = result.quantidy > 0 ? 'Buy' : 'Sell';
      });
    }
    return result;
  }

  private filterMoves(moves: (Movement | undefined)[]): Movement[] {
    const result: Movement[] = [];
    moves.forEach(move => {
      if (move && move.quantidy) {
        result.push(move);
      }
    });
    return result;
  }
  
  private getTotals(noteValue: number, itenValues: number[]) {
    return {
      tax: noteValue - sum(itenValues),
      financialMoves: sum(itenValues.map(price => Math.abs(price))),
    };
  }

  private appliedTax(noteValue: number, moves: Movement[]) {
    const total = this.getTotals(noteValue, moves.map(move => move.price));
    const taxPerUnit = total.tax / total.financialMoves;
    const taxedMoves = moves.map(move => {
      const tax = taxPerUnit * Math.abs(move.price);
      const integerTax = Math.floor(tax);
      const decimalTax = tax - integerTax;
      return {
        ...move,
        integerTax,
        decimalTax,
      };
    }).sort((v1, v2) => v2.decimalTax - v1.decimalTax);
    const leadingCents = total.tax - sum(taxedMoves.map(move => move.integerTax));
    taxedMoves.forEach((move, index) => {
      delete move.decimalTax;
      if (index < leadingCents) move.integerTax++;
      move.price -= move.integerTax;
      delete move.integerTax;
    });
    return taxedMoves;
  }

  registry(note: BrokerageNote) {
    let moves = note.itens.map(item => this.createMovement(note.date, item));
    const groupedMoves = this.groupMoves(moves);
    moves = this.filterMoves(Object.values(groupedMoves)
        .map(grouped => this.joinMoves(grouped)));

    const moveRegister = new MovementRegister();
    this.appliedTax(note.value, moves).forEach((move) => {
      moveRegister.registry(move);
    });
    return DB.getPositions();
  }
}