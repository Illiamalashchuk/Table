// @flow

export type defaultIntegersType = {
    m: number,
    n: number,
    x: number,
};
export type allValuesType = {[id: number]: number}

type tableCell = number;
type tableCells = Array<tableCell>
export type tableRowType = {id: number, cells: tableCells}
export type tableType = Array<tableRowType>

type highlightCell = {id: number, highlight: boolean}
type highlightCells = Array<highlightCell>
export type highlightRowType = {id: number, highlight: boolean, cells: highlightCells}
export type highlightType = Array<highlightRowType>


type meanId = number;
type meanNumber = number;
type meanObject = {id: meanId, number: meanNumber};
export type meanValuesType = Array<meanObject>;

type percentsId = number;
type percentsNumber = string;
type PercentsObject = {id: percentsId, number: percentsNumber};
export type percentsType = Array<PercentsObject>;



export type StateType = {  defaultIntegers: defaultIntegersType, allValues: allValuesType, highlight: highlightType, table: tableType }