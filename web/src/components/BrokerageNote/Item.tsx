import React, {FunctionComponent} from 'react';
import { BrokerageNoteItem as type } from 'protocol';
import Input from './Input';

import { Item } from './styles';
import Currency from './Currency';
import Number from './Number';
import Select from './Select';

interface Props {
  item: type;
}

const BrokerageNoteItem: FunctionComponent<Props> = function({item}) {
  return (
    <Item>
      <Select name="direction" options={{Buy: 'Compra', Sell: 'Venda'}} required />
      <Input name="ticker" required />
      <Number name="quantidy" required />
      <Currency name="unitPrice" required />
    </Item>
  );
};

export default BrokerageNoteItem;