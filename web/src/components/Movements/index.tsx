import React, {useState, useEffect} from 'react';
import {Movement as Type} from 'protocol';

import api from '../../services/api';
import { Link } from '../Switch';
import Date from '../Text/Date';
import Currency from '../Text/Currency';
import ColoredNumber from '../Text/ColoredNumber';

import './styles.scss';

const directions = {
  Buy: 'Compra',
  Sell: 'Venda',
};

export default function Movements() {
  const [movements, setMovements] = useState<Type[]>([]);
  
  useEffect (() => {
    api.get<Type[]>('/moves').then(response => {
      setMovements(response.data);
    });
  }, []);

  return movements.length ? (
    <table>
      <thead>
        <tr>
          <th>Data</th>
          <th>Direção</th>
          <th>Código</th>
          <th>Quantidade</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        {movements.map((movement, index) => (
          <tr key={index}>
            <td className="right"><Date date={movement.date} /></td>
            <td>{directions[movement.direction]}</td>
            <td>{movement.ticker}</td>
            <td className="right"><ColoredNumber value={movement.quantity} /></td>
            <td className="right"><Currency value={movement.price} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div className="container">
      <h2>Não foram encontradas movimentações registradas</h2>
      <p>
        Para cadastrar uma movimentação, você deve cadastrar a nota de corretagem
        em que a movimentação ocorreu.
      </p>
      <Link to="/note/create">Cadastrar Nota de Corretagem</Link>
    </div>
  );
}
