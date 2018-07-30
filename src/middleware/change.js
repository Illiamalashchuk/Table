const changeNumbers = store => next => action => {
   if(action.type === 'CHANGE_NUMBERS') {
       const table = store.getState().table;
       const rowIndex = action.payload.rowIndex;
       const index = action.payload.index
       const clickedCell = action.payload.clickedCell;
       const rowUp = table[rowIndex-1];
       const rowDown = table[rowIndex+1];
       let arrIds = [];
       if(rowUp  === undefined) {
         if(rowDown.columns[index-1] === undefined) {
           arrIds.push(rowDown.columns[index+1], clickedCell)
         } else if(rowDown.columns[index+1] === undefined) {
           arrIds.push(rowDown.columns[index-1], clickedCell)
         } else {
           arrIds.push(rowDown.columns[index+1], rowDown.columns[index-1], clickedCell)
         }
       } else if(rowDown === undefined) {
         if(rowUp.columns[index-1] === undefined) {
           arrIds.push(rowUp.columns[index+1], clickedCell)
         } else if(rowUp.columns[index+1] === undefined) {
           arrIds.push(rowUp.columns[index-1], clickedCell)
         } else {
           arrIds.push(rowUp.columns[index+1], rowUp.columns[index-1], clickedCell)
         }
       } else if(index-1 === -1) {
         arrIds.push(rowUp.columns[index+1], rowDown.columns[index+1], clickedCell)
       } else if(index+1 === table[0].columns.length) {
         arrIds.push(rowUp.columns[index-1], rowDown.columns[index-1], clickedCell)
       } else {
         arrIds.push(rowUp.columns[index-1], rowUp.columns[index+1], rowDown.columns[index-1], rowDown.columns[index+1], clickedCell)
       }
       store.dispatch({type: 'UPDATE_CELL', payload: arrIds})
   }
    return next(action)
  }
  
  export default changeNumbers
  