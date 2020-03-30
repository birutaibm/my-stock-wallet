import React, {useState, useEffect} from 'react';
import { BrokerageNote } from 'protocol';
import api from '../../../services/api';
import Currency from '../../Text/Currency';
import Date from '../../Text/Date';
import {Link} from '../../Switch';

import { Container, Menu, NoteContainer, NoteHeader, NoteItem, NoteItens, NotesList } from './styles';

export default function View() {
  const [notes, setNotes] = useState<BrokerageNote[]>([]);

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    const {data} = await api.get('/notes');
    setNotes(data);
  }

  function renderNote(note: BrokerageNote, index: number) {
    return (
      <NoteContainer key={index}>
        <NoteHeader>
          <div>Data: <Date date={note.date} /></div>
          <div>Total: <Currency value={note.value} /></div>
        </NoteHeader>
        <NoteItens>{note.itens.map((item, i) => {
          const direction = item.direction === 'Buy' ? 'Compra' : 'Venda';
          const description = direction + ' de ' +
              item.quantity + ' ' + item.ticker + ' por ';
          const end = ' cada.'
          return (
            <NoteItem key={i}>
              {description}<Currency value={item.unitPrice}/>{end}
            </NoteItem>
          );
        })}</NoteItens>
      </NoteContainer>
    );
  }

  return (
    <Container>
      <NotesList>
        {notes.length ?
          notes.map(renderNote) :
          (<NoteContainer>Nenhuma nota de corretagem cadastrada</NoteContainer>)
        }
      </NotesList>
      <Menu>
        <Link to="/note/create">
          Adicionar Nota de Corretagem
        </Link>
      </Menu>
    </Container>
  );
}
