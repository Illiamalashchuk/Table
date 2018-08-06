export default function (state = {}, action) {
    const min = 100; // start of random number
    const max = 999; // end of random number
    switch (action.type) {
        case 'SET_ALL_VALUES': {
            const allValues = {};
            for (let i = 0; i < action.payload.length; i++) {
            allValues[action.payload[i]] = Math.floor(Math.random() * (max - min + 1)) + min;
            }
            return allValues;
        }

        case 'ADD_NEW_VALUES': {
            const newValues = {};
            action.payload.forEach((id) => {
            newValues[id] = Math.floor(Math.random() * (max - min + 1)) + min;
            });
            return { ...state, ...newValues };
        }

        case 'DELETE_VALUES':
            action.payload.forEach((id) => {
                delete state[id];
            });
            return state;

        case 'UPDATE_CELL':
            return {
                ...state,
                [action.payload]: state[action.payload] += 1,
            };

        default:
        return state;
    }
}
