import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from './Row'; // row component
import { getMeanValues } from './selectors/index';


class Table extends Component {
  addNewRow() {
    const { allValues, defaultIntegers, addNewRow, addNewValue, addNewHighlight } = this.props;
    const newIdentificators = [];
    let lastCellId = 0;
    for (const key in allValues) {
      lastCellId = +key;
    }
    for (let i = 0; i < defaultIntegers.n; i++) {
      newIdentificators.push(lastCellId + i + 1);
    }

    addNewRow(newIdentificators);
    addNewValue(newIdentificators);
    addNewHighlight(newIdentificators);
  }

  deleteRow(event) {
    const { table, deleteValues, deleteHighlight, deleteRowFromTable } = this.props;
    const rowsId = []; // make an array of row`s id
    table.forEach((row) => {
      rowsId.push(row.id); // push ids inside an array
    });
    const indexOfRow = rowsId.indexOf(+event.target.dataset.id); // find the index of row
    deleteValues(table[indexOfRow].cells); // call our reducer to delete the row
    deleteHighlight(indexOfRow); // call our reducer to delete the row
    deleteRowFromTable(indexOfRow); // call our reducer to delete the row
  }


  render() {
    const { table, meanValues, highlight } = this.props;
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>№</th>
              <th
                colSpan={table[0].cells.length} // spacing ih the head of the table
              >
              Values
              </th>
              <th>Sum</th>
              <th>
                <button
                  className="btn btn-sm btn-success"
                  onClick={this.addNewRow.bind(this)}
                >
                  Add new row
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {table.map((row, index) => (
                <Row 
                  key={row.id}     
                  row={table[index]} // push row inside every row
                  index={index}
                  highlight={highlight[index]}
                  deleteRow={this.deleteRow.bind(this)}
                />
              ))}
            <tr className="table-dark">
              <th>Mean</th>
              {meanValues.map((mean) => (
                <th key={mean.id}>
                {mean.number}
                </th> // row of mean values
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
const addNewRow = (numbers) => {
  const payload = numbers;
  return ({ type: 'ADD_NEW_ROW', payload });
};
const addNewValue = (identificators) => {
  const payload = identificators;
  return ({ type: 'ADD_NEW_VALUES', payload });
};
const addNewHighlight = (newIdentificators) => {
  const payload = newIdentificators;
  return ({ type: 'SET_NEW_HIGHLIGHT', payload });
};
const deleteRowFromTable = (rowIndex) => {
  const payload = rowIndex;
  return ({ type: 'DELETE_ROW_FROM_TABLE', payload });
};
const deleteValues = (values) => {
  const payload = values;
  return ({ type: 'DELETE_VALUES', payload });
};
const deleteHighlight = (values) => {
  const payload = values;
  return ({ type: 'DELETE_HIGHLIGHT', payload });
};

const mapDispatchToProps = {
  addNewRow,
  addNewValue,
  addNewHighlight,
  deleteRowFromTable,
  deleteValues,
  deleteHighlight,
};

const mapStateToProps = state => ({
  defaultIntegers: state.defaultIntegers,
  table: state.table,
  allValues: state.allValues,
  highlight: state.highlight,
  meanValues: getMeanValues(state),
});


export default connect(mapStateToProps, mapDispatchToProps)(Table);
