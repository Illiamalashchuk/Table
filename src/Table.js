import React, { Component }  from 'react';
import { connect } from 'react-redux';
import Row from './Row'; // row component


class Table extends Component {

  // function which delete one row from the table
  // here we send index of row which should be deleted to the @tableReducer@
  // we get index from row`s id
  deleteRow(event) {     
    let rowsId =[]; // make an array of row`s id
    this.props.table.forEach(row => {
      rowsId.push(row.id) // push ids inside an array
    })
    let indexOfRow = rowsId.indexOf(+event.target.id)  // find the index of row
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
                  getMeanValues={this.props.getMeanValues} // push function inside component
                  rowIndex={index} // push index of row inside every row
                  deleteRow={this.deleteRow.bind(this)}
                />
              )
            })}
            <tr className="table-dark">
              <th>Mean</th>
              {this.props.meanValues.map((value, i) => {  
                return (
                  <th key={i}>
                    {value}
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

const mapStateToProps = (state) => {
  return {
    defaultIntegers: state.defaultIntegers,
    table: state.table,
    meanValues: state.meanValues
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
     deleteRowFromTable: (rowIndex) => {
      const payload = rowIndex;
      dispatch({ type: 'DELETE_ROW_FROM_TABLE', payload })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);