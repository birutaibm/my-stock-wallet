import React from 'react';
import {History} from 'history';
import BrokerageNote from '../components/BrokerageNote';

interface Props {
  history: History
};

const Note: React.FunctionComponent<Props> = ({history}) => (<BrokerageNote history={history} />)

export default Note;
