export default function(state = [], action) {
    switch (action.type) { 
        case 'ADD_TABLE':
            const identificators = action.payload.identificators;
            const integers = action.payload.integers;
            let table = [];
            for(let i = 0; i < integers.m; i++) {
                table.push({
                    id: i+1,
                    columns: identificators.splice(0, integers.n)
                })
            };
            return table

        case 'ADD_NEW_ROW':
            const newIdentificators = action.payload;
            const lastRowId = state[state.length-1].id;
            let newRow = {
                id: lastRowId+1,
                columns: []
            }
            newIdentificators.forEach(id => {
                newRow.columns.push(id)
            })
            return [
                ...state, newRow
            ]
            
        case 'DELETE_ROW_FROM_TABLE':
            let newStateFirst = state.slice(0, action.payload)
            let newStateSecond = state.slice(action.payload+1, state.length)
            let newState = newStateFirst.concat(newStateSecond)
            return newState
            
        default:
            return state
    }
}
