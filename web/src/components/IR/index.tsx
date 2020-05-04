import React, {useState, useEffect} from 'react';
import {IRMovement as Type} from 'protocol';

import api from '../../services/api';
import Date from '../Text/Date';
import Currency from '../Text/Currency';

import './styles.scss';

export default function IR() {
  const [irMovements, setIRMovements] = useState<Type[]>([]);
  
  useEffect (() => {
    api.get<Type[]>('/ir').then(response => {
      setIRMovements(response.data);
    });
  }, []);

  return irMovements.length ? (
    <table>
      <thead>
        <tr>
          <th>Data</th>
          <th>Código</th>
          <th>Valor da venda</th>
          <th>Lucro/Prejuízo</th>
        </tr>
      </thead>
      <tbody>
        {irMovements.map((movement, index) => (
          <tr key={index}>
            <td className="right"><Date date={movement.date} /></td>
            <td>{movement.ticker}</td>
            <td className="right"><Currency value={movement.value} /></td>
            <td className="right"><Currency value={movement.profit} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div className="container">
      <h2>Não foram encontradas movimentações geradoras de Imposto de Renda</h2>
      <p>
        Ao registrar novas vendas, o sistema irá calcular os valores de lucro ou
        prejuízo da operação com base na sua posição atual. Os valores
        calculados serão exibidos nesta tela.
      </p>
    </div>
  );
}
