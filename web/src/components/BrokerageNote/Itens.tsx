import React, {FunctionComponent, Fragment} from 'react';
import { Scope } from '@unform/core';

import { BrokerageNoteItem } from 'protocol';
import Item from './Item';
import { Item as Labels } from './styles';

interface Props {
  itens: BrokerageNoteItem[];
}

const Itens: FunctionComponent<Props> = function({itens}) {
  return itens.length ? (
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
  ) : null;
};

export default Itens;
