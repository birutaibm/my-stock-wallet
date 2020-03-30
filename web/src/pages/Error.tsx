import React, {FunctionComponent} from 'react';
import { ErrorMessage } from 'protocol';
import {Link} from '../components/Switch';

interface Props {
  info?: ErrorMessage;
}

const Error: FunctionComponent<Props> = function ({info={message: 'Page not Found'}}) {
  return (
    <div style={{backgroundColor: 'red'}}>
      <h1>{info.message}</h1>
      <p>This site is under construction, maybe you try to access something that is not yet ready.</p>
      <Link to="/">Home</Link>
    </div>
  );
}

export default Error;
