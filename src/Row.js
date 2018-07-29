import React, { Component }  from 'react';
import { connect } from 'react-redux';
import Column from './Column';
import { cookie } from 'redux-effects-universal-cookie';

class Row extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isEnterForPercent: false, // value which is used for choosing which values put inside columns === numbers / percents
    }
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
    let ids = [];
    const index = this.props.table[this.props.rowIndex].columns.indexOf(+event.target.dataset.id)
    const clickedCell = this.props.table[this.props.rowIndex].columns[index];
    const rowUp = this.props.table[this.props.rowIndex-1];
    const rowDown = this.props.table[this.props.rowIndex+1];
    if(rowUp  === undefined) {
      if(rowDown.columns[index-1] === undefined) {
        ids.push(rowDown.columns[index+1], clickedCell)
      } else if(rowDown.columns[index+1] === undefined) {
        ids.push(rowDown.columns[index-1], clickedCell)
      } else {
        ids.push(rowDown.columns[index+1], rowDown.columns[index-1], clickedCell)
      }
    } else if(rowDown === undefined) {
      if(rowUp.columns[index-1] === undefined) {
        ids.push(rowUp.columns[index+1], clickedCell)
      } else if(rowUp.columns[index+1] === undefined) {
        ids.push(rowUp.columns[index-1], clickedCell)
      } else {
        ids.push(rowUp.columns[index+1], rowUp.columns[index-1], clickedCell)
      }
    } else if(index-1 === -1) {
      ids.push(rowUp.columns[index+1], rowDown.columns[index+1], clickedCell)
    } else if(index+1 === this.props.table[0].columns.length) {
      ids.push(rowUp.columns[index-1], rowDown.columns[index-1], clickedCell)
    } else {
      ids.push(rowUp.columns[index-1], rowUp.columns[index+1], rowDown.columns[index-1], rowDown.columns[index+1], clickedCell)
    }
    this.props.updateCell(ids);
    this.props.setCookies(clickedCell, this.props.allValues[clickedCell].number) // setting the cookie
  }
  
  // function called by mouse on some number cell
  // it will highlight x values 
  // number x we get from default integers in global store
  lingthUpSomeValues(event) { 
    this.findNearestValues(this.props.allValues, +event.target.dataset.id, this.props.defaultIntegers);
  }

  findNearestValues(allValues, id, integers) {
    let cells = [];
    let index = 0;
    const x = integers.x;
    const clickedNumber = allValues[id].number;
    for (let key in allValues) {
      cells.push({id: +key, number: allValues[key].number})
    }
    cells.sort(function (a, b) {
      if (a.number > b.number) {
        return 1;
      }
      if (a.number < b.number) {
        return -1;
      }
      return 0;
    });
    cells.forEach((el, i) => {
      if(el.number === clickedNumber) {
        index = i
      }
    })    
    this.highlightCells(cells, index, x, clickedNumber)
  }

  highlightCells(cells, index, x, clickedNumber) {
    let middle;
    if(x%2 === 0) {
      if(index-(x/2) <= 0) {
        cells = cells.slice(0, x+1)
      } else if(index+(x/2) >= cells.length) {
        cells = cells.slice(-(x+1))
      } else {
        cells = cells.slice(index-(x/2), index+(x/2)+1)
      }
    } else if(x%2 === 1) {
      if(index-(Math.round(x/2)-1) <= 0) {
        cells = cells.slice(0, x+1)
      } else if(index+(Math.round(x/2)-1) >= cells.length) {
        cells = cells.slice(-(x+1))
      } else {
        middle = cells.slice(index-(Math.round(x/2)), index+(Math.round(x/2))+1)
        if(clickedNumber - middle[0] > middle[middle.length-1] - clickedNumber) {
          cells = middle.slice(-(middle.length-1))
        } else {
          cells = middle.slice(0, middle.length-1)
        }
      }
    }
    this.props.higlightAllValues(cells)
  }
  // function called on mouse out from cell
  // this func cler all highlighted cells 
  clearLightedValues() {
    this.props.unhiglightAllValues() 
  }


  render() {
    const renderNumbers = this.props.table[this.props.rowIndex].columns.map((value)  => {
      return (
        <Column 
          key={value}
          columnObject={value}
          allValues={this.props.allValues}
          changeValues={this.changeValues.bind(this)}
          clearLightedValues={this.clearLightedValues.bind(this)}
          lingthUpSomeValues={this.lingthUpSomeValues.bind(this)}
        />
      )
    })
    const renderPercents = this.props.rowPercent.map((percent) => {
      return (
        <Column 
          key={percent.id} 
          allValues={this.props.allValues}
          columnObject={percent}
          isEnterForPercent={this.state.isEnterForPercent}
        />
      )
    })
    const result = (this.state.isEnterForPercent) ? (renderPercents) : (renderNumbers);
    return (
      <tr data-id={this.props.rowId}>
        <th>{this.props.rowIndex + 1}</th>
        {result}
        <th
          className="table-warning" 
          onMouseOver={this.hidePercent.bind(this)}
          onMouseOut={this.hidePercent.bind(this)}
        >
          {this.props.rowSumm}
        </th>
        <td>
          <button 
            className="btn btn-danger"
            onClick={this.props.deleteRow}
            data-id={this.props.rowId}
          >
            Delete row
          </button>
        </td>
      </tr>
    )
  }
}


const updateCell = (id) => {
  const payload = id;
  return ({ type: 'UPDATE_CELL', payload })
}
const higlightAllValues = (idArr) => {
  const payload = idArr;
  return ({ type: 'HIGHLIGHT_VALUES', payload })
}
const unhiglightAllValues = () => {
  return ({ type: 'UN_HIGHLIGHT_VALUES'})
}
const setCookies = (id, value) => {
  let date = new Date(new Date().getTime() + 60 * 1000); // cookie will live only 60 seconds
  return cookie(id, value, {expires: date})
}


const mapDispatchToProps = {
  updateCell,
  higlightAllValues,
  unhiglightAllValues,
  setCookies
}

const mapStateToProps = (state) => {
  return {
    defaultIntegers: state.defaultIntegers,
    table: state.table,
    allValues: state.allValues
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Row);