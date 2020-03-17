import React, {FunctionComponent, useRef, useEffect, HTMLProps} from 'react';
import { useField } from '@unform/core';

interface Props extends HTMLProps<HTMLInputElement> {
  name: string
}

const Number: FunctionComponent<Props> = function({name, ...rest}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue = '0', registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'valueAsNumber',
    });
  }, [fieldName, registerField]);

  return (
    <input
      ref={inputRef}
      name={name}
      id={name}
      defaultValue={defaultValue}
      type='number'
      {...rest}
    />
  );
};

export default Number;