import { combineReducers } from 'redux';
import defaultIntegers  from './defaultIntegers';
import table  from './table';
import allValues  from './allValues';


export default combineReducers({
    defaultIntegers,
    table,
    allValues
}) 