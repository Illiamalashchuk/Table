// @flow
import type { defaultIntegersType } from '../../types';

const initialState = {
  m: 10, // number of rows
  n: 10, // number of columns
  x: 10, // number of cells which should be highlighted
};

export default function (state: defaultIntegersType = initialState) {
  return state;
}
