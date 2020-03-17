import React, {FunctionComponent, useRef, useEffect, HTMLProps} from 'react';
import { useField } from '@unform/core';

interface Props extends HTMLProps<HTMLSelectElement> {
  name: string
  options: {[key: string]: string},
}

const Select: FunctionComponent<Props> = function({name, options, ...rest}) {
  const inputRef = useRef<HTMLSelectElement>(null);
  const { fieldName, defaultValue = '', registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <select
      ref={inputRef}
      name={name}
      id={name}
      defaultValue={defaultValue}
      {...rest}
    >{Object.keys(options).map(key => (
      <option value={key} key={key}>{options[key]}</option>
    ))}</select>
  );
};

export default Select;