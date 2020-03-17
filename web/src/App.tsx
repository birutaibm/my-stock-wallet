import React from 'react';
import Positions from './components/Positions';
import BrokerageNote from './components/BrokerageNote';

export default function App() {
  return (
    <div className="App">
      <nav className="menu">
        <button>Adicionar Nota de Corretagem</button>
      </nav>
      <Positions />
      <BrokerageNote />
    </div>
  );
};
