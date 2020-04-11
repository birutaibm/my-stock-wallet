import React from 'react';
import { View } from 'react-native';

// import { Container } from './styles';

export default function Row({children}) {
  return (
    <View style={{flexDirection: 'row'}}>{children}</View>
  );
}
