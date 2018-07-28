import React, { Component }  from 'react';
import { connect } from 'react-redux';
import Row from './Row'; // row component
import { getMeanValues } from './selectors/index'
import { getSummAndPercentRows } from './selectors/index'


class Table extends Component {

  // function which delete one row from the table
  // here we send index of row which should be deleted to the @tableReducer@
  // we get index from row`s id
  deleteRow(event) {     
    let rowsId =[]; // make an array of row`s id
    this.props.table.forEach(row => {
      rowsId.push(row.id) // push ids inside an array
    })
    let indexOfRow = rowsId.indexOf(+event.target.dataset.id)  // find the index of row
    this.props.deleteValues(this.props.table[indexOfRow].columns)  // call our reducer to delete the row
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
                colSpan={this.props.defaultIntegers.n}  // spacing ih the head of the table
              >Values</th>
              <th>Sum</th>
            </tr>
          </thead>
          
          <tbody>
            {this.props.table.map((row, index) => {
              return (
                <Row 
                  key={row.id}     
                  rowIndex={index} // push index of row inside every row
                  rowId={row.id}
                  rowSumm={this.props.rows.rowsSumm[index]}
                  rowPercent={this.props.rows.percentTable[index]}
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

const deleteRowFromTable = (rowIndex) => {
  const payload = rowIndex;
  return ({ type: 'DELETE_ROW_FROM_TABLE', payload })
}
const deleteValues = (values) => {
  const payload = values;
  return ({ type: 'DELETE_VALUES', payload })
}

const mapDispatchToProps = {
  deleteRowFromTable,
  deleteValues
}

const mapStateToProps = (state) => {
  return {
    defaultIntegers: state.defaultIntegers,
    table: state.table,
    meanValues: getMeanValues(state),
    rows: getSummAndPercentRows(state),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Table);