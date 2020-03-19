import React, {useState, FunctionComponent} from 'react';

import { ComponentDefinition, ComponentLibrary } from './types';
import NavContext from './Context';
import Link from './Link';

interface Props {
  pages: ComponentLibrary;
  error: JSX.Element;
}

const Switch: FunctionComponent<Props> = function({pages, error}) {
  const [page, setPage] = useState<ComponentDefinition>("/");

  function getPage(): JSX.Element {
    if (typeof page === 'string') {
      return pages[page] || (error);
    } else {
      return page;
    }
  }

  return (
    <NavContext.Provider value={{setPage}} >
      {getPage()}
    </NavContext.Provider>
  );
};

export {
  NavContext,
  Link,
};

export default Switch;