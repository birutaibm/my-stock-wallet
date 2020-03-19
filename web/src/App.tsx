import React from 'react';

import Switch from './components/Switch';
import BrokerageNote from './components/BrokerageNote';
import Error from './pages/Error';
import Home from './pages/Home';

export default function App() {
  return (
    <div className="App">
      <Switch pages={{
        '/': (<Home />),
        '/note': (<BrokerageNote />)
      }} error={(<Error />)}/>
    </div>
  );
};
