import React, { Component }  from 'react';
import { connect } from 'react-redux';
import Table from './Table'; // table component;


class App extends Component{
  static createIdArray(integers) {
    const arrLength = integers.m*integers.n;
    let identificators = [];
    for(let i = 0; i < arrLength; i++) {
      identificators.push(i+1);
    }
    return identificators
  }


  componentWillMount() {
    const identificators = this.constructor.createIdArray(this.props.defaultIntegers);
    this.props.setAllValues(identificators, this.props.defaultIntegers);   // saving to the store @allValuesReducer@
    this.props.addTable(identificators, this.props.defaultIntegers);   // saving to the store @allValuesReducer@
  }

  // event function on button ===Add new row===
  addNewRow() {
    let numbers = [];
    let lastColumnId = 0;
    for (let key in this.props.allValues) {
      lastColumnId = +key;
    }
    for(let i = 0; i < this.props.defaultIntegers.n; i++) {
      numbers.push(lastColumnId+i+1)
    }
   
    this.props.addNewRow(numbers);
    this.props.addNewValue(this.props.defaultIntegers, numbers);
  }

  render() {
    return (
      <div className="container">
        <Table />
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

const addTable = (identificators, integers) => {
  const payload = {
    identificators: identificators,
    integers: integers
  };
  return ({ type: 'ADD_TABLE', payload })
}
const addNewValue = (integers, identificators) => {
  const payload = {
    integers: integers,
    identificators: identificators
  };
  return ({ type: 'ADD_NEW_VALUES', payload })
}
const addNewRow = (numbers) => {
  const payload = numbers;
  return ({ type: 'ADD_NEW_ROW', payload})
}
const setAllValues = (identificators, integers) => {
  const payload = {
    identificators: identificators,
    integers: integers
  }
  return ({ type: 'SET_ALL_VALUES', payload })
}


const mapStateToProps = (state) => {
  return {
    defaultIntegers: state.defaultIntegers, 
    allValues: state.allValues,
    table: state.table,
  }
};


const mapDispatchToProps = {
  addNewValue,
  addTable,
  addNewRow,
  setAllValues
}

export default connect(mapStateToProps, mapDispatchToProps)(App);