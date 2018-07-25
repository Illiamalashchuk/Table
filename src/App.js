import React, { Component }  from 'react';
import { connect } from 'react-redux';
import Table from './Table'; // table component


class App extends Component{
  
  // static function for creating rows
  // it takes as argumnets a number of row which should be created
  // and make object with id and array of columns
  // each column has it`s id, number and boolean value of highlight
  // return row array
  static createRow(number) { 
    let row = {
      id: Math.random(),
      columns: []
    };
    const min = Math.ceil(100);   // start of random number
    const max = Math.floor(999);  // end of random number
    for(let i = 0; i < number; i++) {
      row.columns.push({
        id: Math.random(),
        number: Math.floor(Math.random() * (max - min + 1)) + min,
        highlighted: false // value for highlightning cells
      });
    }
    return row 
  }

  // function for creating table
  // it makes an empty array of push every row inside
  // then that array will be saved to the global store 
  createTable(integers) {
    let localTable = [];
    for(let i = 0; i < integers.m; i++) {
      localTable.push(App.createRow(integers.n))
    };
    this.props.addTable(localTable); // here we call our reducer and save table to the store @tableReducer@
  }
 
  // here we prepare an empty array for right sorted values and save them by using @countMeanValues@ function
  // than we save them to the global store
  getMeanValues(table) {
    let emptyArrayForSortedValues = [];    // make an empty array
    table[0].columns.forEach(function() {          
      emptyArrayForSortedValues.push([]);
    });
    for(let i = 0; i < table.length; i++) {    // modifying array to  right sorted array
      for(let k = 0; k < table[0].columns.length; k++) {
        emptyArrayForSortedValues[k].push(table[i].columns[k]);
      }
    }
    this.countMeanValues(emptyArrayForSortedValues);  // call function which will count mean values and push them to the state
  }

  // function which count mean values and create array of this values
  countMeanValues(arr) {
    let meanValues = [];
    for(let i = 0; i < arr.length; i++) {
      let total = arr[i].reduce(function(sum, current) {
        return sum + current.number;
      }, 0);
      total = total/arr[i].length;
      total = total.toFixed(2);    // rounding mean values to  000.00 number 
      meanValues.push(total);
    }
    this.props.setMeanValues(meanValues);// saving to the store @meanValuesReducer@
  }


  // concating all values inside  one array
  // and save them to the global store
  concatAllValues(arr) {
    let allValues = [];
    arr.forEach((el) => {
      el.columns.forEach((el) => {                  
        allValues.push(el);         
      })                                   
    })
    allValues.sort();
    this.props.setAllValues(allValues);   // saving to the store @allValuesReducer@
  }

  componentWillMount() {
    this.createTable(this.props.defaultIntegers); // calling table
  }
  
  componentWillReceiveProps(nextProps) {
    // count mean values 
    this.getMeanValues(nextProps.table);
    // call function which set all values in one array and save it to the global store
    this.concatAllValues(nextProps.table);
  }
  

  // event function on button ===Add new row===
  addNewRow() {
    // adding new row by calling static createRow function 
    this.props.addNewRow(App.createRow(this.props.defaultIntegers.n));
  }
 

  render() {
    return (
      <div className="container">
        <Table 
          getMeanValues={this.getMeanValues.bind(this)} // putting mean values to the table component
        />
        <button 
          className="btn btn-success"
          onClick={this.addNewRow.bind(this)}
        >
          Add new row
        </button>
      </div>
    );
    
  }
}

const mapStateToProps = (state) => {
  return {
    defaultIntegers: state.defaultIntegers, 
    table: state.table,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTable: (tableArr) => {
      const payload = tableArr;
      dispatch({ type: 'ADD_TABLE', payload })
    },
    addNewRow: (newRow) => {
      const payload = newRow;
      dispatch({ type: 'ADD_NEW_ROW', payload})
    },
    setMeanValues: (meanValues) => {
      const payload = meanValues;
      dispatch({ type: 'SET_MEAN_VALUES', payload })
    },
    setAllValues: (allValues) => {
      const payload = allValues;
      dispatch({ type: 'SET_ALL_VALUES', payload })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);