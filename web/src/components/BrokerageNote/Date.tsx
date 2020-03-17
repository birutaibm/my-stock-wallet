import React, {FunctionComponent, HTMLProps, useEffect} from 'react';
import { useField } from '@unform/core';
import { Date as Type } from 'protocol';

interface Props extends HTMLProps<HTMLInputElement> {
  name: string
}

const Date: FunctionComponent<Props> = function({name, ...rest}) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const { fieldName, defaultValue = null, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'valueAsDate',
      getValue: (): Type | null => {
        const date = inputRef.current?.valueAsDate;
        return date ? {
          day: date.getDate() + 1,
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        } : null;
      },
      setValue: (value?: Type | null) => {
        if (inputRef.current && value)
          inputRef.current.value = value.day+'/'+value.month+'/'+value.year;
      },
      clearValue: () => {
        if (inputRef.current)
          inputRef.current.value = defaultValue;
      },
    });
  }, [defaultValue, fieldName, registerField]);

  return (
    <input name={name} id={name} type="date" ref={inputRef} {...rest} />
  );
};
export default Date;