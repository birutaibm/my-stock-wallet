import React, {useState, useContext} from 'react';
import { Form } from '@unform/web';

import { BrokerageNote as Type, BrokerageNoteItem, ErrorMessage, Position } from 'protocol';
import Itens from './Itens';
import { Container, Row } from './styles';
import Date from '../../Form/Date';
import Currency from '../../Form/Currency';
import {NavContext} from '../../Switch';
import Error from '../../../pages/Error';
import api from '../../../services/api';

export default function BrokerageNote() {
  const [itens, setItens] = useState<BrokerageNoteItem[]>([]);
  const {setPage} = useContext(NavContext);
  
  function addItem(e: React.MouseEvent) {
    e.preventDefault();
    setItens(old => [
      ...old,
      {
        direction: 'Buy',
        ticker: '',
        quantidy: 0,
        unitPrice: 0,
      }
    ]);
  }
  
  async function handleSubmit(data: Type) {
    let response;
    try {
      response = await api.post<Position[] | ErrorMessage>('/notes', data);
      console.log(response);
      setPage("/");
    } catch (e) {
      console.log(e.response);
      const error = e.response?.data as ErrorMessage;
      setPage(<Error info={error} />)
    }
  }
  
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <label htmlFor="date">Data:</label>
          <Date name="date" required />
          <label htmlFor="value">Valor total:</label>
          <Currency name="value" required />
        </Row>
        <Itens itens={itens} />
        <div>
          <button onClick={addItem}>Adicionar item</button>
          <button  type="submit">Gravar</button>
        </div>
      </Form>
    </Container>
  );
}