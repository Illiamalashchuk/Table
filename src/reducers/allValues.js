export default function(state = [], action) {
    let copyOfState = state.slice();
    switch (action.type) {
        case 'SET_ALL_VALUES':
            return action.payload;
            
        case 'HIGHLIGHT_VALUES':
            action.payload.forEach(index => {
                if(copyOfState[index].highlighted === false)
                copyOfState[index].highlighted = true;
            })
            return copyOfState;
            
        case 'UN_HIGHLIGHT_VALUES':
            copyOfState.forEach(el => {
                el.highlighted = false;
            })
            return copyOfState;
            
        default:
            return state
    }
}