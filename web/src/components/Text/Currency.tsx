import React, {FunctionComponent} from 'react';
import ColoredNumber from './ColoredNumber';

interface Props {
  value: number;
  positiveColor?: string,
  negativeColor?: string,
}

const Currency: FunctionComponent<Props> = function ({value, positiveColor='blue', negativeColor='red'}) {
  function getTextParts() {
    const text = Math.abs(Math.round(value)).toString();
  
    const parts = [
      text.substring(0, text.length - 2),
      text.substring(text.length - 2)
    ];
    while (parts[1].length < 2) {
      parts[1] = '0' + parts[1];
    }
    if (parts[0].length === 0) {
      parts[0] = '0';
    } else {
      while (parts[0].length > 3) {
        const part = parts.shift() || '';
        parts.unshift(
          part.substring(0, part.length - 3),
          part.substring(part.length - 3)
        );
      }
    }
    return parts;
  }

  function getText() {
    const parts = getTextParts();
    let text = ',' + (parts.pop() || '00');
    text = (parts.pop() || '0') + text;
    while (parts.length) {
      text = parts.pop() + '.' + text;
    }
    text = 'R$ ' + text;
    if (value < 0) {
      text = '-' + text;
    }
    return text;
  }

  return (
    <ColoredNumber
      value={value}
      format={(v:number) => getText()}
      positiveColor={positiveColor}
      negativeColor={negativeColor}
    />
  );
};

export default Currency;
