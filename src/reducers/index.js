import { combineReducers } from 'redux';
import defaultIntegers from './defaultIntegers';
import table from './table';
import allValues from './allValues';
import highlight from './highlight';


export default combineReducers({
    defaultIntegers,
    table,
    allValues,
    highlight,
});
