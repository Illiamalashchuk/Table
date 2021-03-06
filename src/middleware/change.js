// @flow
import type { Middleware } from 'redux';
import type { StateType } from '../../types';
type updateCellAction = { type: 'UPDATE_CELL', payload: number };
type changeActionType = { rowIndex: number, index: number, clickedCell: number };

const changeNumbers: Middleware<StateType, updateCellAction> = store => next => action => {
  if (action.type === 'CHANGE_NUMBERS') {
    const { table } = store.getState();
    const { rowIndex, index, clickedCell }: changeActionType = action.payload;
    const rowUp = table[rowIndex - 1];
    const rowDown = table[rowIndex + 1];
    store.dispatch({ type: 'UPDATE_CELL', payload: clickedCell });
    if (rowUp === undefined) {
      if (rowDown.cells[index - 1] === undefined) {
        store.dispatch({ type: 'UPDATE_CELL', payload: rowDown.cells[index + 1] });
      } else if (rowDown.cells[index + 1] === undefined) {
        store.dispatch({ type: 'UPDATE_CELL', payload: rowDown.cells[index - 1] });
      } else {
        store.dispatch({ type: 'UPDATE_CELL', payload: rowDown.cells[index + 1] });
        store.dispatch({ type: 'UPDATE_CELL', payload: rowDown.cells[index - 1] });
      }
    } else if (rowDown === undefined) {
      if (rowUp.cells[index - 1] === undefined) {
        store.dispatch({ type: 'UPDATE_CELL', payload: rowUp.cells[index + 1] });
      } else if (rowUp.cells[index + 1] === undefined) {
        store.dispatch({ type: 'UPDATE_CELL', payload: rowUp.cells[index - 1] });
      } else {
        store.dispatch({ type: 'UPDATE_CELL', payload: rowUp.cells[index + 1] });
        store.dispatch({ type: 'UPDATE_CELL', payload: rowUp.cells[index - 1] });
      }
    } else if (index - 1 === -1) {
      store.dispatch({ type: 'UPDATE_CELL', payload: rowUp.cells[index + 1] });
      store.dispatch({ type: 'UPDATE_CELL', payload: rowDown.cells[index + 1] });
    } else if (index + 1 === table[0].cells.length) {
      store.dispatch({ type: 'UPDATE_CELL', payload: rowUp.cells[index - 1] });
      store.dispatch({ type: 'UPDATE_CELL', payload: rowDown.cells[index - 1] });
    } else {
      store.dispatch({ type: 'UPDATE_CELL', payload: rowUp.cells[index - 1] });
      store.dispatch({ type: 'UPDATE_CELL', payload: rowUp.cells[index + 1] });
      store.dispatch({ type: 'UPDATE_CELL', payload: rowDown.cells[index + 1] });
      store.dispatch({ type: 'UPDATE_CELL', payload: rowDown.cells[index - 1] });
    }
  }

  return next(action);
};

export default changeNumbers;
