import React, { Fragment } from 'react';
import Positions from '../components/Positions';
import {Link} from '../components/Switch';

export default function Home() {
  return (
    <Fragment>
      <nav className="menu">
        <Link to="/note">
          Notas de Corretagem
        </Link>
      </nav>
      <Positions />
    </Fragment>
  );
}
