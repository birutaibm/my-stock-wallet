import React from 'react';
import { View, Text } from 'react-native';
import {Strong, Row, Currency} from '../../Base';

export default function Position({position}) {
  return (
    <View style={{backgroundColor: '#FFF'}}>
      <Row><Strong>Ticker: </Strong><Text>{position.ticker}</Text></Row>
      <Row><Strong>Quantidade: </Strong><Text>{position.quantity}</Text></Row>
      <Row><Strong>Preço: </Strong> <Currency value={position.price} /></Row>
    </View>
  );
}
