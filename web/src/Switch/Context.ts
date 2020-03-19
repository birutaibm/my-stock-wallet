import { createContext } from 'react';
import { ComponentDefinition } from './types';

interface ValueType {
  setPage: (page: ComponentDefinition) => void
}

const unseted = {
  setPage: (page: ComponentDefinition) => {
    throw new Error("Unseted mechanism");
  }
};

const NavContext = createContext<ValueType>(unseted);

export default NavContext;