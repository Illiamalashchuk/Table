export default function(state = [], action) {
    switch (action.type) { 
        case 'ADD_TABLE':
            let table = [];
            for(let i = 0; i < action.payload.integers.m; i++) {
                table.push({
                    id: i+1,
                    cells: action.payload.identificators.splice(0, action.payload.integers.n),
                })
            };
            return table

        case 'ADD_NEW_ROW':
            let newRow = {
                id: state[state.length-1].id+1,
                cells: [],
            }
            action.payload.forEach(id => {
                newRow.cells.push(id)
            })
            return [
                ...state, newRow
            ]
            
        case 'DELETE_ROW_FROM_TABLE':
            return [
                ...state.slice(0, action.payload),
                ...state.slice(action.payload+1, state.length)
            ]
            
        default:
            return state
    }
}
