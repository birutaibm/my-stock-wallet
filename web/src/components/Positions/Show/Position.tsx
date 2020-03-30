import React, { FunctionComponent } from 'react';
import { Position as type } from 'protocol';

import { Item } from './styles';
import Currency from '../../Text/Currency';

interface Props {
  position: type;
}

const Position: FunctionComponent<Props> = ({position}) => {
  return (
    <Item>
      <strong>Ticker: </strong> {position.ticker} <br/>
      <strong>Quantidade: </strong> {position.quantity} <br/>
      <strong>Preço: </strong> <Currency value={position.price} /> <br/>
    </Item>
  );
};

export default Position;