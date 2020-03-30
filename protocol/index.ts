export interface ErrorMessage {
  message: string
};

export interface Date {
  year: number,
  month: number,
  day: number,
};

export interface BrokerageNoteItem {
  direction: 'Buy' | 'Sell',
  ticker: string,
  quantity: number,
  unitPrice: number,
}

export interface BrokerageNote {
  date: Date,
  value: number,
  itens: BrokerageNoteItem[],
}

export interface Position {
  ticker: string,
  date?: Date,
  quantity: number,
  price: number
};

export type Positions = {[key: string]: Position[]};

export interface Movement {
  date: Date,
  direction: 'Buy' | 'Sell',
  ticker: string,
  quantity: number,
  price: number,
};

export interface IRMovement {
  date: Date,
  ticker: string,
  value: number,
  profit: number,
}