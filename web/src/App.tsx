import React from 'react';

import Switch from './components/Switch';
import ShowNotes from './components/BrokerageNote/Show';
import Error from './pages/Error';
import Home from './pages/Home';
import CreateNote from './components/BrokerageNote/Create';

export default function App() {
  return (
    <div className="App">
      <Switch pages={{
        '/': (<Home />),
        '/note': (<ShowNotes />),
        '/note/create': (<CreateNote />),
      }} error={(<Error />)}/>
    </div>
  );
};
