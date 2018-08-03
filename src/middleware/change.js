const changeNumbers = store => next => action => {
  if(action.type === 'CHANGE_NUMBERS') {
    const table = store.getState().table;
    const rowIndex = action.payload.rowIndex;
    const index = action.payload.index
    const clickedCellId = action.payload.clickedCell;
    const rowUp = table[rowIndex-1];
    const rowDown = table[rowIndex+1];
    store.dispatch({type: 'UPDATE_CELL', payload: clickedCellId})
    if(rowUp  === undefined) {
      if(rowDown.cells[index-1] === undefined) {
        store.dispatch({type: 'UPDATE_CELL', payload: rowDown.cells[index+1]})
      } else if(rowDown.cells[index+1] === undefined) {
        store.dispatch({type: 'UPDATE_CELL', payload: rowDown.cells[index-1]})
      } else {
        store.dispatch({type: 'UPDATE_CELL', payload: rowDown.cells[index+1]})
        store.dispatch({type: 'UPDATE_CELL', payload: rowDown.cells[index-1]})
      }
    } else if(rowDown === undefined) {
      if(rowUp.cells[index-1] === undefined) {
        store.dispatch({type: 'UPDATE_CELL', payload: rowUp.cells[index+1]})
      } else if(rowUp.cells[index+1] === undefined) {
        store.dispatch({type: 'UPDATE_CELL', payload: rowUp.cells[index-1]})
      } else {
        store.dispatch({type: 'UPDATE_CELL', payload: rowUp.cells[index+1]})
        store.dispatch({type: 'UPDATE_CELL', payload: rowUp.cells[index-1]})
      }
    } else if(index-1 === -1) {
      store.dispatch({type: 'UPDATE_CELL', payload: rowUp.cells[index+1]})
      store.dispatch({type: 'UPDATE_CELL', payload: rowDown.cells[index+1]})
    } else if(index+1 === table[0].cells.length) {
      store.dispatch({type: 'UPDATE_CELL', payload: rowUp.cells[index-1]})
      store.dispatch({type: 'UPDATE_CELL', payload: rowDown.cells[index-1]})
    } else {
      store.dispatch({type: 'UPDATE_CELL', payload: rowUp.cells[index-1]})
      store.dispatch({type: 'UPDATE_CELL', payload: rowUp.cells[index+1]})
      store.dispatch({type: 'UPDATE_CELL', payload: rowDown.cells[index+1]})
      store.dispatch({type: 'UPDATE_CELL', payload: rowDown.cells[index-1]})
    }
  }

  return next(action)
}
  
export default changeNumbers
  