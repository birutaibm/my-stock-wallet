import React, {FunctionComponent} from 'react';
import { Date as Type} from 'protocol';

interface Props {
  date: Type,
}

const Date: FunctionComponent<Props> = function ({date}) {
  return (
    <span>{date.day}/{date.month}/{date.year}</span>
  );
}

export default Date;