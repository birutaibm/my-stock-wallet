import React, {FunctionComponent, useRef, useEffect, HTMLProps} from 'react';
import Inputmask from "inputmask";
import { useField } from '@unform/core';

interface Props extends HTMLProps<HTMLInputElement> {
  name: string,
  prefix?: string
}

const Currency: FunctionComponent<Props> = function({name, prefix='R$ ', ...rest}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue = '0', registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      getValue: () => {
        if (inputRef.current) {
          let {value} = inputRef.current;
          value = value.replace(prefix, '').replace(',', '');
          while (value.indexOf('.') >= 0) {
            value = value.replace('.', '');
          }
          return Number(value);
        } else {
          return 0;
        }
      }
    });
  }, [fieldName, prefix, registerField]);

  useEffect(() => {
    if (inputRef.current) {
      Inputmask("currency", {
        radixPoint: ",",
        groupSeparator: '.',
        numericInput: true,
        placeholder: "0",
        prefix,
        allowMinus: true,
      }).mask(inputRef.current);
    }
  }, [inputRef, prefix]);

  return (
    <input
      ref={inputRef}
      name={name}
      id={name}
      defaultValue={defaultValue}
      type="text"
      {...rest}
    />
  );
};

export default Currency;