import React, { Fragment } from 'react';
import Positions from '../components/Positions';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

export default function Home() {
  return (
    <Fragment>
      <nav className="menu">
        <Link to="/note">Adicionar Nota de Corretagem</Link>
      </nav>
      <Positions />
    </Fragment>
  );
}
