import React, { Component }  from 'react';
import { connect } from 'react-redux';
import Row from './Row'; // row component
import { getMeanValues } from './selectors/index'


class Table extends Component {

  addNewRow() {
    let newIdentificators = [];
    let lastCellId = 0;
    for (let key in this.props.allValues) {
      lastCellId = +key;
    }
    for(let i = 0; i < this.props.defaultIntegers.n; i++) {
      newIdentificators.push(lastCellId+i+1)
    }

    this.props.addNewRow(newIdentificators);
    this.props.addNewValue(newIdentificators);
    this.props.addNewHighlight(newIdentificators);
  }

  deleteRow(event) {     
    let rowsId =[]; // make an array of row`s id
    this.props.table.forEach(row => {
      rowsId.push(row.id) // push ids inside an array
    })
    let indexOfRow = rowsId.indexOf(+event.target.dataset.id)  // find the index of row
    this.props.deleteValues(this.props.table[indexOfRow].cells)  // call our reducer to delete the row
    this.props.deleteHighlight(indexOfRow)  // call our reducer to delete the row
    this.props.deleteRowFromTable(indexOfRow)  // call our reducer to delete the row
  }


  render() { 

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>№</th>
              <th 
                colSpan={this.props.table[0].cells.length}  // spacing ih the head of the table
              >Values</th>
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
            {this.props.table.map((row, index) => {
              return (
                <Row 
                  key={row.id}     
                  row={this.props.table[index]} // push row inside every row
                  index={index}
                  highlight={this.props.highlight[index]}
                  deleteRow={this.deleteRow.bind(this)}
                />
              )
            })}
            <tr className="table-dark">
              <th>Mean</th>
              {this.props.meanValues.map((mean) => {  
                return (
                  <th key={mean.id}>
                    {mean.number}
                  </th>  // row of mean values
                )
              })}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
const addNewRow = (numbers) => {
  const payload = numbers;
  return ({ type: 'ADD_NEW_ROW', payload})
}
const addNewValue = (identificators) => {
  const payload = identificators;
  return ({ type: 'ADD_NEW_VALUES', payload })
}
const addNewHighlight = (newIdentificators) => {
  const payload = newIdentificators;
  return ({ type: 'SET_NEW_HIGHLIGHT', payload })
}
const deleteRowFromTable = (rowIndex) => {
  const payload = rowIndex;
  return ({ type: 'DELETE_ROW_FROM_TABLE', payload })
}
const deleteValues = (values) => {
  const payload = values;
  return ({ type: 'DELETE_VALUES', payload })
}
const deleteHighlight = (values) => {
  const payload = values;
  return ({ type: 'DELETE_HIGHLIGHT', payload })
}

const mapDispatchToProps = {
  addNewRow,
  addNewValue,
  addNewHighlight,
  deleteRowFromTable,
  deleteValues,
  deleteHighlight
}

const mapStateToProps = (state) => {
  return {
    defaultIntegers: state.defaultIntegers, 
    table: state.table,
    allValues: state.allValues,
    highlight: state.highlight,
    meanValues: getMeanValues(state),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Table);