import React, {useState, useEffect} from 'react';
import {Position as Type} from 'protocol';
import Position from './Position';
import api from '../../../services/api';

import { Container } from './styles';
import { Link } from '../../Switch';

export default function Positions() {
  const [positions, setPositions] = useState<Type[]>([]);
  
  useEffect (() => {
    api.get<Type[]>('/positions').then(response => {
      setPositions(response.data);
    });
  }, []);

  return (
    <div>
      <Container>
        {positions.map((position, index) => (
          <Position position={position} key={index} />
        ))}
      </Container>
      <nav>
        <Link to="/position/create">
          Adicionar Posição
        </Link>
      </nav>
    </div>
  );
}
