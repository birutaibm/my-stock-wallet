import React, {useContext} from 'react';
import { Form } from '@unform/web';

import { ErrorMessage, Position } from 'protocol';
import { Container, Row } from './styles';
import Text from '../../Form/Text';
import Currency from '../../Form/Currency';
import Number from '../../Form/Number';
import {NavContext} from '../../Switch';
import Error from '../../../pages/Error';
import api from '../../../services/api';

export default function Positions() {
  const {setPage} = useContext(NavContext);
  
  async function handleSubmit(data: Position) {
    let response;
    try {
      response = await api.post<Position[] | ErrorMessage>('/positions', data);
      setPage("/position");
    } catch (e) {
      const error = e.response?.data as ErrorMessage;
      setPage(<Error info={error} />)
    }
  }
  
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <label htmlFor="ticker">Código:</label>
          <Text name="ticker" required />
        </Row>
        <Row>
          <label htmlFor="quantity">Quantidade:</label>
          <Number name="quantity" required />
        </Row>
        <Row>
          <label htmlFor="price">Preço total de aquisição:</label>
          <Currency name="price" required />
        </Row>
        <div>
          <button  type="submit">Gravar</button>
        </div>
      </Form>
    </Container>
  );
}