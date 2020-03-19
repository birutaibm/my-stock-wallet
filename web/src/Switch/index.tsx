import React, {useState} from 'react';

import { ComponentDefinition, ComponentLibrary } from './types';
import NavContext from './Context';
import Home from '../pages/Home';
import BrokerageNote from '../components/BrokerageNote';
import Error from '../pages/Error';

export default function Switch() {
  const [page, setPage] = useState<ComponentDefinition>("/");
  const pages: ComponentLibrary = {
    '/': (<Home />),
    '/note': (<BrokerageNote />)
  };

  function getPage(): JSX.Element {
    if (typeof page === 'string') {
      return pages[page] || (<Error />);
    } else {
      return page;
    }
  }

  return (
    <NavContext.Provider value={{setPage}} >
      {getPage()}
    </NavContext.Provider>
  );
}
