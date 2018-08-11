// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cell from './Cell';
import type { defaultIntegersType, allValuesType, tableRowType, highlightRowType, percentsType } from '../types';


const setCookies = (id: number) :{| type: 'SET_COOKIES', payload: number |} => {
  const payload = id;
  return ({ type: 'SET_COOKIES', payload });
};
const changeNumbers = (rowIndex: number, index: number, clickedCell: number) :{| type: 'CHANGE_NUMBERS', payload: Object |} => {
  const payload = { rowIndex, index, clickedCell };
  return ({ type: 'CHANGE_NUMBERS', payload });
};
const highlightCells = (id: number, x: number, values: allValuesType) :{| type: 'HIGHLIGHT_CELLS', payload: Object |} => {
  const payload = { id, x, values };
  return ({ type: 'HIGHLIGHT_CELLS', payload });
};
const unhighlightCells = () => ({ type: 'UNHIGHLIGHT_CELLS'});


type RowProps = {
	highlightCells: typeof highlightCells,
	unhighlightCells: typeof unhighlightCells,
	changeNumbers: typeof changeNumbers,
  setCookies: typeof setCookies,
  deleteRow: Function,
	defaultIntegers: defaultIntegersType,
  allValues: allValuesType,
  row: tableRowType,
  highlight: highlightRowType,
  index: number,
}

type RowState = {
	isEnterForPercent: boolean,
	summ: number,
	percents: percentsType,
}


class Row extends Component<RowProps, RowState> {
	state = {
		isEnterForPercent: false,
		summ: 0,
		percents: [],
	};
	

  UNSAFE_componentWillMount() {
    const { allValues, row } = this.props;
    const total = row.cells.reduce((sum, current) => sum + allValues[current], 0);
    this.setState({
      summ: total,
    });
    this.countPercents(allValues, row, total);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { allValues, row } = this.props;
    const total = row.cells.reduce((sum, current) => sum + nextProps.allValues[current], 0);
    this.setState({
      summ: total,
    });
    this.countPercents(allValues, row, total);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { allValues, highlight, index } = this.props;
    if (this.state.isEnterForPercent !== nextState.isEnterForPercent) {
      return true;
    } if (allValues !== nextProps.allValues) {
      return true;
    } else if (highlight.highlight !== nextProps.highlight.highlight) {
      return true;
    } else if (index !== nextProps.index) {
      return true;
    } else {
      return false;
    }
  }

  countPercents(allValues, row, total) {
    const percentsRow = [];
    row.cells.forEach((cellId, i) => {
      percentsRow.push({ id: i, number: `${Math.round(allValues[cellId] / total * 100)}%` });
    });
    this.setState({
      percents: percentsRow,
    });
  }

  // show percents inside cells
  hidePercent() {
    this.setState({
      isEnterForPercent: !this.state.isEnterForPercent,
    });
  }

  // number of cells will rise +1 by every click
  // summ of the row will also change as so mean values in bottom of the table
  changeValues(event: SyntheticEvent<HTMLTableCellElement>) {
    const { row, index, changeNumbers, setCookies } = this.props;
    const indexOfCell = row.cells.indexOf(+event.currentTarget.dataset.id);
    const clickedCell = row.cells[indexOfCell];
    changeNumbers(index, indexOfCell, clickedCell);
    setCookies(clickedCell)
  }

  // function called by mouse on some number cell
  // it will highlight x values
  // number x we get from default integers in global store
  lingthUpSomeValues(event: SyntheticEvent<HTMLTableCellElement>) {
    const { defaultIntegers, allValues, highlightCells } = this.props;
    highlightCells(+event.currentTarget.dataset.id, defaultIntegers.x, allValues);
  }

  // function called on mouse out from cell
  // this func cler all highlighted cells
  clearLightedValues() {
    const { unhighlightCells } = this.props;
    unhighlightCells();
  }


  render() {
    const { row, allValues, highlight, index, deleteRow } = this.props;
    const { percents, isEnterForPercent, summ } = this.state;
    const renderNumbers = row.cells.map((cell, index) => (
      <Cell 
        key={cell}
        id={cell}
        value={allValues[cell]}
        highlight={highlight.cells[index].highlight}
        changeValues={this.changeValues.bind(this)}
        lingthUpSomeValues={this.lingthUpSomeValues.bind(this)}
        clearLightedValues={this.clearLightedValues.bind(this)}

        isEnterForPercent={isEnterForPercent}

      />
    ));
    const renderPercents = percents.map(value => (
      <Cell 
        key={value.id} 
        id={value.id}
        value={value.number}
        isEnterForPercent={isEnterForPercent}

        changeValues={this.changeValues.bind(this)}
        lingthUpSomeValues={this.lingthUpSomeValues.bind(this)}
        clearLightedValues={this.clearLightedValues.bind(this)}
        highlight={false}



      />
    ));
    const result = (isEnterForPercent) ? (renderPercents) : (renderNumbers);
    return (
      <tr data-id={row.id}>
        <th>
          {index + 1}
        </th>
        {result}
        <th
          className="table-warning"
          onMouseOver={this.hidePercent.bind(this)}
          onMouseOut={this.hidePercent.bind(this)}
        >
          {summ}
        </th>
        <td>
          <button
            className="btn btn-danger"
            onClick={deleteRow}
            data-id={row.id}
          >
            Delete row
          </button>
        </td>
      </tr>
    );
  }
}



const mapDispatchToProps = {
  highlightCells,
  unhighlightCells,
  changeNumbers,
  setCookies,
};

const mapStateToProps = (state: RowProps) => ({
  defaultIntegers: state.defaultIntegers,
  allValues: state.allValues,
});


export default connect(mapStateToProps, mapDispatchToProps)(Row);
