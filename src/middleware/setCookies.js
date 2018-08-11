// @flow
import type { Middleware } from 'redux';
import type { StateType } from '../../types';
type setCookiesAction = { type: 'SET_COOKIES', payload: number };
const saveCookies: Middleware<StateType, setCookiesAction> = store => next => action => {
  if (action.type === "SET_COOKIES") {
    const { allValues } = store.getState();
    const date = new Date(new Date().getTime() + 60 * 1000);
    const expires = "expires= "+ date.toUTCString();
    const cookie = action.payload + "=" + allValues[action.payload] + ";" + expires + ";path=/";
    document.cookie = cookie;
    
    return next(action)
  } else {
    return next(action)
  }
}
  
export default saveCookies;