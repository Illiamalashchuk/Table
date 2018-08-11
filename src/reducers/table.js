// @flow
import type { tableType, defaultIntegersType } from '../../types';

type state = tableType;

type addTableAction = { type: 'ADD_TABLE', payload: { identificators: number[], integers: defaultIntegersType } };
type addNewRowAction = { type: 'ADD_NEW_ROW', payload: number[] };
type deleteRowFromTableAction = { type: 'DELETE_ROW_FROM_TABLE', payload: number };

type action = addTableAction |addNewRowAction | deleteRowFromTableAction;


export default function (state: state = [], action: action) {
    const table = [];
    let newRow = {};
    switch (action.type) {
        case 'ADD_TABLE': {
            const identificators = action.payload.identificators.slice();
            for (let i = 0; i < action.payload.integers.m; i++) {
                let newCells: number[] = identificators.splice(0, action.payload.integers.n);
                newRow = {id: i + 1, cells: newCells};
                table.push(newRow);
            }
            return table;
        }

        case 'ADD_NEW_ROW': {
            newRow = {
                id: state[state.length - 1].id + 1,
                cells: [],
            };
            action.payload.forEach((id) => {
                newRow.cells.push(id);
            });
            return [
                ...state, newRow,
            ];
        }

        case 'DELETE_ROW_FROM_TABLE': {
            return [
                ...state.slice(0, action.payload),
                ...state.slice(action.payload + 1, state.length),
            ];
        }

        default:
            return state;
    }
}
