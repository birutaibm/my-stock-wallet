import React, {FunctionComponent, useRef, useEffect, HTMLProps} from 'react';
import { useField } from '@unform/core';

interface Props extends HTMLProps<HTMLInputElement> {
  name: string
}

const Input: FunctionComponent<Props> = function({name, ...rest}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue = '', registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <input
      ref={inputRef}
      name={name}
      id={name}
      defaultValue={defaultValue}
      {...rest}
    />
  );
};

export default Input;