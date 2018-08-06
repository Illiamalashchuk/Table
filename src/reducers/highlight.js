export default function (state = [], action) {
    let copyState = [...state];
    switch (action.type) {
        case 'SET_HIGHLIGHT': {
        const highlight = [];
        const identificators = action.payload.identificators.slice();
        for (let i = 0; i < action.payload.integers.m; i++) {
            const cells = identificators.splice(0, action.payload.integers.n);
            cells.forEach((cell, index) => {
            cells[index] = {
                id: cell,
                highlight: false,
            };
            });
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
            cells.push({ id: +key, difference: Math.abs(action.payload.values[action.payload.id] - action.payload.values[key]) });
        }
        let ids = cells.sort((a, b) => a.difference - b.difference);
        ids = ids.slice(0, action.payload.x + 1);
        // console.log(ids)
        // ids.forEach(el => {
        //     copyState.forEach((row, rowIndex) => {
        //             console.log(row.cells)

        //         let newRow = {...row};
        //         newRow.cells.forEach((cell, cellIndex) => {
        //             let newCell = {...cell}
        //             if(newCell.id === el.id) {
        //                 newRow.highlight = true;
        //                 cell.highlight = true;
        //             }
        //         })
        //     copyState[rowIndex] = newRow;
        //     })
        // })

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
