import DB from '../Model';
import {BrokerageNote, BrokerageNoteItem, Movement, Date} from 'protocol';
import MovementRegister from './MovementRegister';
import {sum} from '../utils';
import {DayTradeNotSupported} from '../Errors';

class NoteRegister {
  private createMovement(date: Date, item:BrokerageNoteItem): Movement {
    const quantity = (item.direction === 'Buy') ? 
      Math.abs(item.quantity) : 
      - Math.abs(item.quantity);
    const price = (item.direction === 'Buy') ? (
      - Math.abs(item.unitPrice * quantity)
    ) : (
      Math.abs(item.unitPrice * quantity)
    );
    return {
      date,
      ticker: item.ticker,
      direction: item.direction,
      quantity,
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
        if (result.direction !== move.direction) {
          DayTradeNotSupported();
        } else {
          result.quantity += move.quantity;
          result.price += move.price;
          result.direction = result.quantity > 0 ? 'Buy' : 'Sell';
        }
      });
    }
    return result;
  }

  private filterMoves(moves: (Movement | undefined)[]): Movement[] {
    const result: Movement[] = [];
    moves.forEach(move => {
      if (move && move.quantity) {
        result.push(move);
      }
    });
    return result;
  }
  
  private getTotals(noteValue: number, itenValues: number[]) {
    return {
      tax:  sum(itenValues) - noteValue,
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

    this.appliedTax(note.value, moves).forEach((move) => {
      MovementRegister.registry(move);
    });

    DB.saveNote(note);
    return DB.getNotes();
  }
}

export default new NoteRegister();