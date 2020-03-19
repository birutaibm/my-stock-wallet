import React, {FunctionComponent, useContext} from 'react';
import { ComponentDefinition } from './types';
import NavContext from './Context';

interface Props {
  to: ComponentDefinition;
}

const Link: FunctionComponent<Props> = function({to, children}) {
  const {setPage} = useContext(NavContext);

  return (
    <button onClick={e => setPage(to)}>{children}</button>
  );
};

export default Link;
