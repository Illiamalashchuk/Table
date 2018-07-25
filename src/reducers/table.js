export default function(state = [], action) {
    switch (action.type) {
        case 'ADD_TABLE':
            return action.payload;
            
        case 'ADD_NEW_ROW':
            return [
                ...state, action.payload
            ]
            
        case 'UPDATE_ROW':
            let copyState = state.slice()
            let row = copyState[action.payload.rowIndex];
            row.columns[action.payload.columnIndex].number += 1
            return copyState

        case 'DELETE_ROW_FROM_TABLE':
            let newStateFirst = state.slice(0, action.payload)
            let newStateSecond = state.slice(action.payload+1, state.length)
            let newState = newStateFirst.concat(newStateSecond)

            return newState
            
        default:
            return state
    }
}