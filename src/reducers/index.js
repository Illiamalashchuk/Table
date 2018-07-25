import { combineReducers } from 'redux';
import defaultIntegers  from './defaultIntegers';
import table  from './table';
import meanValues  from './meanValues';
import allValues  from './allValues';


export default combineReducers({
    defaultIntegers,
    table,
    allValues,
    meanValues
}) 