import React, {FunctionComponent} from 'react';

interface Props {
  value: number;
  positiveColor?: string,
  negativeColor?: string,
}

const Currency: FunctionComponent<Props> = function ({value, positiveColor='blue', negativeColor='red'}) {
  function getText() {
    let text = Math.abs(Math.round(value)).toString();
    console.log({text});

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
    console.log(parts);
    
    text = ',' + (parts.pop() || '00');
    text = (parts.pop() || '0') + text;
    console.log({text, parts});

    while (parts.length) {
      text = parts.pop() + '.' + text;
    }
    text = 'R$ ' + text;
    if (value < 0) {
      text = '-' + text;
    }
    console.log(text);
    return text;
  }

  function getColor() {
    return (value<0) ? {color: negativeColor} : {color: positiveColor};
  }

  return (
    <span style={getColor()}>{getText()}</span>
  );
};

export default Currency;
