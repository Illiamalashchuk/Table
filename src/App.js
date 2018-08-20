// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from './Table';
import type { defaultIntegersType } from '../types';


export const saveIntegers = (dispatch) => {
  return dispatch => fetch('https://api.myjson.com/bins/evuaw')
    .then(response => response.json())
    .then(data => {
      const integers = { m: +data.m, n: +data.n, x: +data.x }
      const arrLength = integers.m * integers.n;
      const identificators = [];
      for (let i = 0; i < arrLength; i += 1) {
        identificators.push(i + 1);
      }
      dispatch ({ type: 'SAVE_INTEGERS', payload: integers });
      dispatch ({ type: 'SET_HIGHLIGHT', payload: { identificators, integers } });
      dispatch ({ type: 'ADD_TABLE', payload: { identificators, integers } });
      dispatch ({ type: 'SET_ALL_VALUES', payload: identificators });
    });
}


type AppProps = {
  defaultIntegers: defaultIntegersType,
};


class App extends Component<AppProps> {

  componentWillMount() {
    this.props.saveIntegers(this.props.dispatch)
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
  saveIntegers
};



export default connect(null, mapDispatchToProps)(App);

