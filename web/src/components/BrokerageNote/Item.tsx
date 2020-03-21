import React, {FunctionComponent} from 'react';
import { BrokerageNoteItem as type } from 'protocol';

import { Item } from './styles';
import Input from '../Form/Text';
import Currency from '../Form/Currency';
import Number from '../Form/Number';
import Select from '../Form/Select';

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