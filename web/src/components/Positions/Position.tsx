import React, { FunctionComponent } from 'react';
import { Position as type } from 'protocol';

import { Item } from './styles';

interface Props {
  position: type;
}

const Position: FunctionComponent<Props> = ({position}) => {
  let price = ''+position.price;
  price = price.substring(0,price.length-2) + ',' + price.substring(price.length-2);

  return (
    <Item>
      <strong>Ticker: </strong> {position.ticker} <br/>
      <strong>Quantidade: </strong> {position.quantidy} <br/>
      <strong>Preço: </strong> {price} <br/>
    </Item>
  );
};

export default Position;