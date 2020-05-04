import React from 'react';

import {AppContainer} from './styles';
import Switch, { Link } from './components/Switch';
import Error from './pages/Error';
import ShowNotes from './components/BrokerageNote/Show';
import CreateNote from './components/BrokerageNote/Create';
import ShowPositions from './components/Positions/Show';
import CreatePosition from './components/Positions/Create';
import Movements from './components/Movements';
import IR from './components/IR';

export default function App() {
  return (
    <AppContainer>
      <Switch pages={{
        '/': (<ShowPositions />),
        '/position': (<ShowPositions />),
        '/position/create': (<CreatePosition />),
        '/note': (<ShowNotes />),
        '/note/create': (<CreateNote />),
        '/movement': (<Movements />),
        '/ir': (<IR />),
      }} error={(<Error />)}/>
      <nav className="menu">
        <Link to="/position"> Posições </Link>
        <Link to="/note"> Notas de Corretagem </Link>
        <Link to="/ir"> Imposto de Renda </Link>
        <Link to="/movement"> Movimentações </Link>
      </nav>
    </AppContainer>
  );
};
