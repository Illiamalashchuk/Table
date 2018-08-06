import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cell from './Cell';


class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnterForPercent: false,
      summ: 0,
      percents: [],
    };
  }

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
    } else if (allValues !== nextState.allValues && highlight.highlight !== nextProps.highlight.highlight) {
      return true;
    } else if (index !== nextProps.index) {
      return true;
    } else {
      return false;
    }
  }

  countPercents(allValues, row, total) {
    const percensRow = [];
    row.cells.forEach((cellId, i) => {
      percensRow.push({ id: i, number: Math.round(allValues[cellId] / total * 100) });
    });
    this.setState({
      percents: percensRow,
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
  changeValues(event) {
    const { row, index, changeNumbers, setCookies } = this.props;
    const indexOfCell = row.cells.indexOf(+event.target.dataset.id);
    const clickedCell = row.cells[indexOfCell];
    changeNumbers(index, indexOfCell, clickedCell);
    setCookies(clickedCell)
  }

  // function called by mouse on some number cell
  // it will highlight x values
  // number x we get from default integers in global store
  lingthUpSomeValues(event) {
    const { defaultIntegers, allValues, higlightCells } = this.props;
    higlightCells(+event.target.dataset.id, defaultIntegers.x, allValues);
  }

  // function called on mouse out from cell
  // this func cler all highlighted cells
  clearLightedValues() {
    const { unhiglightCells } = this.props;
    unhiglightCells();
  }


  render() {
    const { row, allValues, highlight, index, deleteRow } = this.props;
    const renderNumbers = row.cells.map((cell, index) => (
      <Cell 
        key={cell}
        id={cell}
        value={allValues[cell]}
        highlight={highlight.cells[index].highlight}
        changeValues={this.changeValues.bind(this)}
        lingthUpSomeValues={this.lingthUpSomeValues.bind(this)}
        clearLightedValues={this.clearLightedValues.bind(this)}
      />
    ));
    const renderPercents = this.state.percents.map(value => (
      <Cell 
        key={value.id} 
        value={value}
        isEnterForPercent={this.state.isEnterForPercent}
      />
    ));
    const result = (this.state.isEnterForPercent) ? (renderPercents) : (renderNumbers);
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
          {this.state.summ}
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

const setCookies = (id) => {
  const payload = id;
  return ({ type: 'SET_COOKIES', payload });
};
const changeNumbers = (rowIndex, index, clickedCell) => {
  const payload = { rowIndex, index, clickedCell };
  return ({ type: 'CHANGE_NUMBERS', payload });
};
const higlightCells = (id, x, values) => {
  const payload = { id, x, values };
  return ({ type: 'HIGHLIGHT_CELLS', payload });
};
const unhiglightCells = () => ({ type: 'UNHIGHLIGHT_CELLS'});


const mapDispatchToProps = {
  higlightCells,
  unhiglightCells,
  changeNumbers,
  setCookies,
};

const mapStateToProps = state => ({
  defaultIntegers: state.defaultIntegers,
  allValues: state.allValues,
});


export default connect(mapStateToProps, mapDispatchToProps)(Row);
