// @flow
import React from 'react';


type CellProps = {
  isEnterForPercent: boolean,
  highlight: boolean,
  id: number,
  value: string | number,
  changeValues: (event: SyntheticEvent<HTMLTableCellElement>) => void,
  lingthUpSomeValues: (event: SyntheticEvent<HTMLTableCellElement>) => void,
  clearLightedValues: () => void
}

export default function Cell(props: CellProps) {
  const { isEnterForPercent, highlight, id, changeValues, lingthUpSomeValues, clearLightedValues, value } = props;
  const className = isEnterForPercent ? ('table-light') : ((highlight) ? ('table-primary') : ('table-light'));
  return (
    <td
      className={className}
      data-id={id}
      onClick={changeValues}
      onMouseOver={lingthUpSomeValues}
      onMouseOut={clearLightedValues}
    >
      {value}
      <div
        style={isEnterForPercent ? ({ backgroundColor: 'blue', paddingTop: value }) : ({ display: 'none' })}
        />
    </td>
  );
}
