// @flow
import { createSelector } from 'reselect'
import type { StateType } from '../../types';

const getAllValues = (state: StateType) => state.allValues;
const getIntegers = (state: StateType) => state.defaultIntegers;
const getTable = (state: StateType) => state.table;


export const getMeanValues = createSelector(
  [ getAllValues, getIntegers, getTable ],
  (allValues, integers, table) => {    
    let emptyArrayForSortedValues = [];    // make an empty array
    let meanValues = [];
    for(let i = 0; i < integers.n; i++) {         
      emptyArrayForSortedValues.push([]);
    }
    for(let i = 0; i < table.length; i++) {    // modifying array to  right sorted array
      for(let k = 0; k < table[0].cells.length; k++) {
        emptyArrayForSortedValues[k].push(table[i].cells[k]);
      }
    }  
    for(let i = 0; i < emptyArrayForSortedValues.length; i++) {
      let total = emptyArrayForSortedValues[i].reduce(function(sum, current) {
         return sum + allValues[current];
      }, 0);
      total = total/emptyArrayForSortedValues[i].length;
      total = total.toFixed(2);    // rounding mean values to  000.00 number 
      meanValues.push({id: i+1, number: total});
    }
    return meanValues
  }
)