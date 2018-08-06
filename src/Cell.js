import React from 'react';

export default function Cell(props) {
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
      {isEnterForPercent ? (`${value.number}%`) : (value)}
      <div
        id={value.id}
        style={isEnterForPercent ? ({ backgroundColor: 'blue', paddingTop: `${value.number}%` }) : ({ display: 'none' })}
        />
    </td>
  );
}
