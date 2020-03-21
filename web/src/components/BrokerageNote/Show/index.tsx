import React, {useState, useEffect} from 'react';
import { BrokerageNote } from 'protocol';
import api from '../../../services/api';
import Currency from '../../Text/Currency';
import Date from '../../Text/Date';
import {Link} from '../../Switch';

// import { Container } from './styles';

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
      <li key={index}>
        <div>
          <div>Data: <Date date={note.date} /></div>
          <div>Total: <Currency value={note.value} /></div>
        </div>
        <ul>{note.itens.map((item, i) => {
          const direction = item.direction === 'Buy' ? 'Compra' : 'Venda';
          const description = direction + ' de ' +
              item.quantidy + ' ' + item.ticker + ' por ';
          const end = ' cada.'
          return (
            <li key={i}>
              {description}<Currency value={item.unitPrice}/>{end}
            </li>
          );
        })}</ul>
      </li>
    );
  }

  return (
    <div>
      <ul>
        {notes.length ?
          notes.map(renderNote) :
          (<li>Nenhuma nota de corretagem cadastrada</li>)
        }
      </ul>
      <nav className="menu">
        <Link to="/note/create">
          Adicionar Nota de Corretagem
        </Link>
      </nav>
    </div>
  );
}
