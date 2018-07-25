export default function(state = [], action) {
    switch (action.type) {
        case 'SET_MEAN_VALUES':
            return action.payload;
        default:
            return state;
    }
}