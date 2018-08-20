// @flow
import type { defaultIntegersType } from '../../types';

type saveIntegers = { type: 'SAVE_INTEGERS', payload: {m: number, n: number, x: number} };

export default function (state: defaultIntegersType = {}, action: saveIntegers) {
  switch (action.type) {
    case 'SAVE_INTEGERS': {
      const integers = action.payload;
      return integers
    }

    default:
      return state;
  }
}
