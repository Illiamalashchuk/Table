import React, { Component }  from 'react';
import { connect } from 'react-redux';
import Column from './Column';


class Row extends Component{
  constructor(props) {
    super(props);
    this.state = {
      summ: 0,                  // summ of numbers in columns  
      percents: [],             // array of percents
      isEnterForPercent: false, // values which are used for choosing which values put inside columns === numbers / percents
    }
  }

  // count summ of numbers and set it to  the component`s state 
  countSummOfRowNumbers(rowArr) {
    const rowColumns = rowArr.columns;
    let total = rowColumns.reduce(function(sum, current) {   
      return sum + current.number;
    }, 0);
    this.setState({
      summ: total
    })
    // call function which make an array of percents and set it to component`s state
    this.countPercentsArray(rowColumns, total);
  }

  // count persents of every number and set them to the component`s state
  countPercentsArray(rowColumns, summ) {
    let percents = [];
    rowColumns.forEach((columnObject) => {
      let percent = {
        id: Math.random(),
        number: `${Math.round(columnObject.number/summ*100)}%`
      }
      percents.push(percent);
    });
    this.setState({
      percents: percents,
    });
  }

  // show percents inside cells
  hidePercent() {
    this.setState({
      isEnterForPercent: !this.state.isEnterForPercent
    })
  }

  // change value of cell by clicking on the cell
  // number will rise +1 by every click
  // summ of the row will also change as so mean values in bottom of the table
  changeValues(event) {
    let item = this.props.table[this.props.rowIndex].columns.find(item => item.id === +event.target.id); // find number which sho;ud be change by it`s id
    let columnIndex = this.props.table[this.props.rowIndex].columns.indexOf(item); // index of row which will be changed inside @tableReducer@
    this.props.updateRow(item.number, this.props.rowIndex, columnIndex);  // callind raducer
    this.countSummOfRowNumbers(this.props.table[this.props.rowIndex]);  // count summ of the row after changing the number
  }
  
  
    componentWillMount() {
    this.countSummOfRowNumbers(this.props.table[this.props.rowIndex]);  // first summ counting
    this.props.getMeanValues(this.props.table);  // get mean values - it will be sended to the App component by this function
  }


  // function called by mouse on some number cell
  // it will highlight x values 
  // number x we get from default integers in global store
  lingthUpSomeValues(event) {   
    this.findNearestValues(this.props.allValues, event.target);
  }
  // here we call function which have already found values which should be highlighted
  findNearestValues(allValues, focusedCell) {
    const x = this.props.defaultIntegers.x;
    const focusedNumber = +focusedCell.innerText; // number of hovered cell
    let copyOfallValues = [];                     // making array of all numbers
    allValues.forEach(value => {
      copyOfallValues.push(value.number);
    })
    let sortedCopyOfAllValues = copyOfallValues.slice().sort() // right sorted numbers

    let indexOfAllValues = sortedCopyOfAllValues.indexOf(focusedNumber); // index of focused number inside sorted numbers 
    let middleValues =  this.getMiddleValues(sortedCopyOfAllValues, indexOfAllValues, x); // call func which slicing middle array
    let valuesForLightning = this.getValuesForLightning(middleValues, focusedNumber, x); // getttin final numbers for higlightning
    
  
    let indexOfLightningValues = [];           // make an array of indexes of each number for lightning 
    valuesForLightning.forEach(value => {
      indexOfLightningValues.push(copyOfallValues.indexOf(value));
    })
    
    this.props.higlightAllValues(indexOfLightningValues);  // send this array of indexes to the @allValuesReducer@
  }

  // function which make an array of middle numbers 
  // here we concat array of numbers on the left side from focused number and array from the right side
  getMiddleValues(copyOfallValues, indexOfAllValues, x) {
    let middleValues = [];
    let arrLeft = [];
    let arrRight = [];
    if(indexOfAllValues === -1) {  // if there are any focused numbers
      middleValues = [];
    } else if(indexOfAllValues === 1) { // if focused number is first of second inside allNumbers array
      arrLeft = copyOfallValues.slice(0, indexOfAllValues); // slice allValues from first el to focused number
    } else if(indexOfAllValues - x < 0) { // if number of elemnets from array`s begin to focused number is low that x
      arrLeft = copyOfallValues.slice(0, indexOfAllValues); // slice allValues from first el to focused number
    } else {
      arrLeft = copyOfallValues.slice(indexOfAllValues-x, indexOfAllValues); // slice x elements on the left side from focused number
    }
    arrRight = copyOfallValues.slice(indexOfAllValues, indexOfAllValues+x+1); // slice x elements from focused number
    middleValues = arrLeft.concat(arrRight);  // concating both sides together
    return middleValues
  }
  
  // function which takes middle numbers and make final array of numbers which should be lighted
  // here we can choose x numbers which are closer to focused number 
  // it depends on if x is even of odd number
  getValuesForLightning(middleValues, focusedNumber, x) {
    let indexOfmiddleValues = middleValues.indexOf(focusedNumber); // find index of focused number inside middle array
    let valuesForLightning = []; // final array
    let firstIndexForDeleting = indexOfmiddleValues - (x/2); // index of el from which should start choose elements
    let lastIndexForDeleting = indexOfmiddleValues + (x/2);  //  index of el on which should end choose elements

    if(x%2 === 0) {  // if x is even number
      if(firstIndexForDeleting <= 0) {  // if start index <= 0
        valuesForLightning = middleValues.slice(0, x+1); // choose x+1 element from the start of middle array
      } else if(firstIndexForDeleting > 0) { // if start index > 0 
        if(lastIndexForDeleting >= middleValues.length - 1) {  // if end index is last element
          valuesForLightning = middleValues.slice(-(x+1)); // choose x+1 element from the end of middle array
        } else {
          valuesForLightning = middleValues.slice(indexOfmiddleValues-(x/2), indexOfmiddleValues+(x/2) +1); // choose x els + focused number
        }
      }
    } else if(x%2 === 1) {  // if x is odd number
      if(firstIndexForDeleting <= 0) {      // if start index <= 0
        valuesForLightning = middleValues.slice(0, x+1); //choose x+1 element from the start of middle array
      } else if(firstIndexForDeleting > 0 ) {

        if(lastIndexForDeleting >= middleValues.length - 1) {    // if end index is last element
          valuesForLightning = middleValues.slice(-(x+1));   // choose x+1 element from the end of middle array
        } else {
          let roundedHalfX = Math.round(x/2); // rounded half of the x
          valuesForLightning = middleValues.slice(indexOfmiddleValues - ((x-1)/2), indexOfmiddleValues + ((x-1)/2) + 1); //choose x els + focused number
          let first = middleValues.slice(indexOfmiddleValues - roundedHalfX, indexOfmiddleValues - roundedHalfX + 1); // + 1 el on the left side
          let last = middleValues.slice(indexOfmiddleValues + roundedHalfX, indexOfmiddleValues + roundedHalfX + 1); // +1 el on ht right side

          if(focusedNumber - first[0] < last[0] - focusedNumber) {  // choosing which number (first/last) is closer to focused number
            valuesForLightning = first.concat(valuesForLightning);
          } else if (focusedNumber - first[0] > last[0] - focusedNumber) {
            valuesForLightning = valuesForLightning.concat(last);
          } else {
            valuesForLightning = first.concat(valuesForLightning, last); 
          }
        }
      }
    }

    return valuesForLightning
  }
  // function called on mouse out from cell
  // this func cler all highlighted cells 
  clearLightedValues() {
    this.props.unhiglightAllValues() 
  }


  render() {
  const renderNumbers = this.props.table[this.props.rowIndex].columns.map((value, i)  => {
    return (
      <Column 
        key={i}
        columnObject={value}
        changeValues={this.changeValues.bind(this)}
        clearLightedValues={this.clearLightedValues.bind(this)}
        lingthUpSomeValues={this.lingthUpSomeValues.bind(this)}
      />
    )
  })
  const renderPercents = this.state.percents.map((percent) => {
    return (
      <Column 
        key={percent.id} 
        columnObject={percent}
        isEnterForPercent={this.state.isEnterForPercent}
      />
    )
  })
  const result = (this.state.isEnterForPercent) ? (renderPercents) : (renderNumbers);
  return (
    <tr id={this.props.table[this.props.rowIndex].id}>
      <th>{this.props.rowIndex + 1}</th>
      {result}
      <th
        className="table-warning" 
        onMouseOver={this.hidePercent.bind(this)}
        onMouseOut={this.hidePercent.bind(this)}
      >
        {this.state.summ}
      </th>
      <td>
        <button 
          className="btn btn-danger"
          onClick={this.props.deleteRow}
          id={this.props.table[this.props.rowIndex].id}
        >
          Delete row
        </button>
      </td>
    </tr>
  )
}
}

const mapStateToProps = (state) => {
  return {
    table: state.table,
    defaultIntegers: state.defaultIntegers,
    allValues: state.allValues
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateRow: (number, rowIndex, columnIndex) => {
      const payload = {
        rowIndex: rowIndex,
        columnIndex: columnIndex
      }
      dispatch({ type: 'UPDATE_ROW', payload })
    },
     higlightAllValues: (indexArr) => {
      const payload = indexArr;
      dispatch({ type: 'HIGHLIGHT_VALUES', payload })
    },
    unhiglightAllValues: () => {
      dispatch({ type: 'UN_HIGHLIGHT_VALUES'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Row);