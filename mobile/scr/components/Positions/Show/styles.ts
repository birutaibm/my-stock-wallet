import styled from 'styled-components/native';
import { FlatList } from 'react-native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #ddd;
`;

export const PositionsList = styled(FlatList)`
  margin: 10px;
`;
