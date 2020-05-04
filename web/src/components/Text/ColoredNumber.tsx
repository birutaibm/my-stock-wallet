import React, {FunctionComponent} from 'react';

type NumberFormater = (value: number) => string

interface Props {
  value: number,
  format?: NumberFormater,
  positiveColor?: string,
  negativeColor?: string,
}

const ColoredNumber: FunctionComponent<Props> = function ({
  value,
  positiveColor='blue',
  negativeColor='red',
  format= (v:number) => v.toString(),
}) {
  function getColor() {
    return (value<0) ? {color: negativeColor} : {color: positiveColor};
  }

  return (
    <span style={getColor()}>{format(value)}</span>
  );
};

export default ColoredNumber;
