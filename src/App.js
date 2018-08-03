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
    this.props.setAllValues(identificators);   
    this.props.setHighlight(identificators, this.props.defaultIntegers);   
    this.props.addTable(identificators, this.props.defaultIntegers);
  }


  render() {
    return (
      <div className="container">
        <Table />
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
const setAllValues = (identificators) => {
  const payload = identificators;
  return ({ type: 'SET_ALL_VALUES', payload })
}
const setHighlight = (identificators, integers) => {
  const payload = {identificators, integers};
  return ({ type: 'SET_HIGHLIGHT', payload })
}


const mapDispatchToProps = {
  addTable,
  setAllValues,
  setHighlight
}


const mapStateToProps = (state) => {
  return {
    defaultIntegers: state.defaultIntegers 
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(App);