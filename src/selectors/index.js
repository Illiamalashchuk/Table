import { createSelector } from 'reselect'

const getAllValues = (state) => state.allValues;
const getTable = (state) => state.table;


export const getMeanValues = createSelector(
  [ getAllValues, getTable ],
  (allValues, table) => {
    let emptyArrayForSortedValues = [];    // make an empty array
    table[0].columns.forEach(function() {          
      emptyArrayForSortedValues.push([]);
    });
    for(let i = 0; i < table.length; i++) {    // modifying array to  right sorted array
      for(let k = 0; k < table[0].columns.length; k++) {
        emptyArrayForSortedValues[k].push(table[i].columns[k]);
      }
    }  
    let meanValues = [];
    for(let i = 0; i < emptyArrayForSortedValues.length; i++) {
      let total = emptyArrayForSortedValues[i].reduce(function(sum, current) {
         return sum + allValues[current].number;
      }, 0);
      total = total/emptyArrayForSortedValues[i].length;
      total = total.toFixed(2);    // rounding mean values to  000.00 number 
      meanValues.push({id: i+1, number: total});
    }
    return meanValues
  }
)

export const getSummAndPercentRows = createSelector(
  [ getAllValues, getTable ],
  (allValues, table) => {
    let rowsSumm = [];
    let percentTable = [];
    table.forEach(row => {
      let percensRow = [];
      let total = row.columns.reduce(function(sum, current) {   
        return sum + allValues[current].number;
      }, 0);
      rowsSumm.push(total)
      row.columns.forEach((columnId, i) => {
        percensRow.push({id: i, number: Math.round(allValues[columnId].number/total*100)}) 
      })    
      percentTable.push(percensRow);
    })
    return {rowsSumm: rowsSumm, percentTable: percentTable}
  }
)