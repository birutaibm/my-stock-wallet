import React from 'react';
import { Text } from 'react-native';

import Currency from '../../../Base/Currency';

import { Container, Strong, Row } from './styles';

interface Props {
  position: {
    ticker: string;
    quantity: number;
    price: number;
  }
}

const Position: React.FC<Props> = ({position}) => {
  return (
    <Container>
      <Row><Strong>Ticker: </Strong><Text>{position.ticker}</Text></Row>
      <Row><Strong>Quantidade: </Strong><Text>{position.quantity}</Text></Row>
      <Row><Strong>Preço: </Strong><Currency value={position.price} /></Row>
    </Container>
  );
};

export default Position;
