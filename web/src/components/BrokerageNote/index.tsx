import React, {useState, Fragment, useContext} from 'react';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';

import { BrokerageNote as Type, BrokerageNoteItem, ErrorMessage, Position } from 'protocol';
import Item from './Item';
import { Container, Item as Labels, Row } from './styles';
import Date from './Date';
import Currency from './Currency';
import {NavContext} from '../Switch';
import Error from '../../pages/Error';
import api from '../../services/api';

export default function BrokerageNote() {
  const [itens, setItens] = useState<BrokerageNoteItem[]>([]);
  const {setPage} = useContext(NavContext);
  
  function renderItens() {
    return (
      <Fragment>
        <Labels>
          <span>Direção</span>
          <span>Código</span>
          <span>Quantidade</span>
          <span>Preço unitário</span>
        </Labels>
        {itens.map((item, index) => (
          <Scope path={'itens['+index+']'} key={index}>
            <Item item={item} />
          </Scope>
        ))}
      </Fragment>
    );
  }
  
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
      <Form onSubmit={handleSubmit} action="/">
        <Row>
          <label htmlFor="date">Data:</label>
          <Date name="date" required />
          <label htmlFor="value">Valor total:</label>
          <Currency name="value" required />
        </Row>
        {itens.length ? renderItens() : null}
        <div>
          <button onClick={addItem}>Adicionar item</button>
          <button  type="submit">Gravar</button>
        </div>
      </Form>
    </Container>
  );
}