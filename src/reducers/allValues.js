export default function(state = [], action) {
    const min = 100;   // start of random number
    const max = 999;   // end of random number
    let newState = Object.assign({}, state);
    switch (action.type) {
        case 'SET_ALL_VALUES':
            const arrLength = action.payload.integers.m*action.payload.integers.n;
            let allValues = {};
            for(let i = 0; i < arrLength; i++) {
                allValues[action.payload.identificators[i]] = {
                    number: Math.floor(Math.random() * (max - min + 1)) + min,
                    highlighted: false // value for highlightning cells 
                }
            }
            return allValues
        
        case 'ADD_NEW_VALUES':
            for(let i = 0; i < action.payload.identificators.length; i++) {
                newState[action.payload.identificators[i]] = {
                    number: Math.floor(Math.random() * (max - min + 1)) + min,
                    highlighted: false // value for highlightning cells 
                };
            }
            return newState

        case 'DELETE_VALUES':
            action.payload.forEach(id => {
                delete newState[id]
            })
            return newState

        case 'UPDATE_CELL':
            action.payload.forEach(id => {
                newState[id].number += 1;
            })
            return newState
            
        case 'HIGHLIGHT_VALUES':
            action.payload.forEach(el => {
                newState[el.id].highlighted = true
            })
            return newState
            
        case 'UN_HIGHLIGHT_VALUES':
            for (let key in newState) {
                if(newState[key].highlighted === true) {
                    newState[key].highlighted = false
                }
            }
            return newState;
            
        default:
            return state
    }
}