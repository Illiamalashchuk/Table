// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from './Table';
import type { defaultIntegersType } from '../types';

const addTable = (identificators: number[], integers: defaultIntegersType) :{| type: 'ADD_TABLE', payload: Object  |} => {
  const payload = { identificators, integers };
  return ({ type: 'ADD_TABLE', payload });
}
const setAllValues = (identificators: number[]) :{| type: 'SET_ALL_VALUES', payload: number[] |} => {
  const payload = identificators;
  return ({ type: 'SET_ALL_VALUES', payload });
}
const setHighlight = (identificators: number[], integers: defaultIntegersType) :{| type: 'SET_HIGHLIGHT', payload: Object |} => {
  const payload = { identificators, integers };
  return ({ type: 'SET_HIGHLIGHT', payload });
}


type AppProps = {
  defaultIntegers: defaultIntegersType,
  setAllValues: typeof setAllValues,
  setHighlight: typeof setHighlight,
  addTable: typeof addTable
};


class App extends Component<AppProps> {
  static createIdArray(integers) {
    const arrLength = integers.m * integers.n;
    const identificators = [];
    for (let i = 0; i < arrLength; i += 1) {
      identificators.push(i + 1);
    }
    return identificators;
  }

  UNSAFE_componentWillMount() {
    const { defaultIntegers, setAllValues, setHighlight, addTable } = this.props;
    const identificators = this.constructor.createIdArray(defaultIntegers);
    setAllValues(identificators);
    setHighlight(identificators, defaultIntegers);
    addTable(identificators, defaultIntegers);
  }


  render() {
    return (
      <div className="container">
        <Table />
      </div>
    ); 
  }
};


const mapDispatchToProps = {
  addTable,
  setAllValues,
  setHighlight,
};


const mapStateToProps = (state: AppProps)  => {
  return {
    defaultIntegers: state.defaultIntegers,
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
