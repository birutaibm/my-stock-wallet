import React, {FunctionComponent} from 'react';
import { ErrorMessage } from 'protocol';
import Link from '../Switch/Link';

interface Props {
  info?: ErrorMessage;
}

const Error: FunctionComponent<Props> = function ({info={message: 'Page not Found'}}) {
  return (
    <div style={{backgroundColor: 'red'}}>
      <h1>{info.message}</h1>
      <Link to="/">Home</Link>
    </div>
  );
}

export default Error;
