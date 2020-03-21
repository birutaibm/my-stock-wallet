import { Request, Response } from 'express';

type TypeFormat = {[key: string]: string};
type TypeList = {[key: string]: TypeFormat | string};
type TypeMethod = {
  response: string,
  body?: string,
};
type TypeEndpoint = {
  get?: TypeMethod,
  post?: TypeMethod
};
type TypeDoc = {
  types: TypeList,
  endPoints: {[key: string]: TypeEndpoint},
};

class RootCtrl {
  private documentation: TypeDoc = {
    types: {
      ErrorMessage: {
        message: 'string'
      },
      Date: {
        year: 'number',
        month: 'number',
        day: 'number',
      },
      BrokerageNoteItem: {
        direction: "'Buy' | 'Sell'",
        ticker: 'string',
        quantidy: 'number',
        unitPrice: 'number',
      },
      BrokerageNote: {
        date: 'Date',
        value: 'number',
        itens: 'BrokerageNoteItem[]',
      },
      Position: {
        ticker: 'string',
        quantidy: 'number',
        price: 'number',
      },
      Positions: '{[key: string]: Position[]}',
      Movement: {
        date: 'Date',
        direction: "'Buy' | 'Sell'",
        ticker: 'string',
        quantidy: 'number',
        price: 'number',
      },
      IRMovement: {
        date: 'Date',
        ticker: 'string',
        value: 'number',
        profit: 'number',
      }
    },
    endPoints: {
      positions: {
        post: {
          body: 'Position',
          response: 'Position[]',
        },
        get: {
          response: 'Position[]',
        },
      },
      notes: {
        post: {
          body: 'BrokerageNote',
          response: 'BrokerageNote[]',
        },
        get: {
          response: 'BrokerageNote[]',
        },
      },
      moves: {
        get: {
          response: 'Movement[]',
        },
      },
      ir: {
        get: {
          response: 'IRMovement[]',
        }
      }
    },
  };

  public index(req: Request, res: Response<TypeDoc>) {
    return res.json(this.documentation);
  }
}

export default new RootCtrl();