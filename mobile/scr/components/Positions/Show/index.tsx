import React, {useState, useEffect} from 'react';

import api from '../../../services/api';
import Position from './Position';
import { Container, PositionsList } from './styles';

const Positions: React.FC = () => {
  const [positions, setPositions] = useState([]);

  useEffect (() => {
    api.get('/positions').then(response => {
      setPositions(response.data);
    });
  }, []);

  return (
    <Container>
      <PositionsList
        data={positions}
        keyExtractor={(item, index) => index.toString}
        renderItem={({item: position}) => (
          <Position position={position} />
        )}
      />
    </Container>
  );
}

export default Positions;
