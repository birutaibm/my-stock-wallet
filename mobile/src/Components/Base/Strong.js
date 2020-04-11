import React from 'react';
import { Text } from 'react-native';

// import { Container } from './styles';

export default function Strong({children}) {
  return (
    <Text style={{fontWeight: 'bold'}}>
      {children}
    </Text>
  );
}
