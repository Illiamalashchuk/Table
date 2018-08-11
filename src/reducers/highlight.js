// @flow
import type { highlightType, allValuesType, defaultIntegersType } from '../../types';

type state = highlightType;

type setHighlightAction = { type: 'SET_HIGHLIGHT', payload: { identificators: number[], integers: defaultIntegersType } };
type setNewHighlightAction = { type: 'SET_NEW_HIGHLIGHT', payload: number[] };
type deleteHighlightAction = { type: 'DELETE_HIGHLIGHT', payload: number };
type highlightCellsAction = { type: 'HIGHLIGHT_CELLS', payload: { id: number, x: number, values: allValuesType} };
type unhighlightCellsAction = { type: 'UNHIGHLIGHT_CELLS'};

type action = setHighlightAction |setNewHighlightAction | deleteHighlightAction | highlightCellsAction | unhighlightCellsAction;


export default function (state: state = [], action: action) {
    let copyState = [...state];
    switch (action.type) {
        case 'SET_HIGHLIGHT': {
            const highlight = [];
            const identificators = action.payload.identificators.slice();
            for (let i = 0; i < action.payload.integers.m; i++) {
                let cells = identificators.splice(0, action.payload.integers.n);
                let newCells = [];
                cells.forEach((cell, index) => {
                    newCells[index] = {
                        id: cell,
                        highlight: false,
                    };
                });
                cells = newCells;
                highlight.push({
                    id: i + 1,
                    highlight: false,
                    cells,
                });
            }
            return highlight;
        }

        case 'SET_NEW_HIGHLIGHT': {
            const row = {
                id: state[state.length - 1].id + 1, // next row id which we count by taking last row id
                highlight: false,
                cells: [],
            };
            action.payload.forEach((id) => {
                row.cells.push({ id, highlight: false });
            });
            return [
                ...state, row,
            ];
        }


        case 'DELETE_HIGHLIGHT':
            return [
                ...state.slice(0, action.payload),
                ...state.slice(action.payload + 1, state.length),
            ];

        case 'HIGHLIGHT_CELLS': {
            const cells = [];
            for (const key in action.payload.values) {
                cells.push({ id: +key, difference: Math.abs(action.payload.values[action.payload.id] - action.payload.values[+key]) });
            }
            let ids = cells.sort((a, b) => a.difference - b.difference);
            ids = ids.slice(0, action.payload.x + 1);

            ids.forEach((el) => {
                copyState = copyState.map((row) => {
                const newRow = { ...row };
                newRow.cells = row.cells.map((cell) => {
                    const newCell = { ...cell };
                    if (newCell.id === el.id) {
                    newCell.highlight = true;
                    newRow.highlight = true;
                    }
                    return newCell;
                });
                return newRow;
                });
            });

            return copyState;
        }

        case 'UNHIGHLIGHT_CELLS': {
            copyState.forEach((row, rowIndex) => {
                const nRow = { ...row };
                nRow.highlight = false;
                nRow.cells.forEach((cell) => {
                cell.highlight = false;
                });
                copyState[rowIndex] = nRow;
            });

            return copyState;
        }

        default:
            return state;
    }
}
