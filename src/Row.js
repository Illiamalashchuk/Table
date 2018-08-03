import React, { Component }  from 'react';
import { connect } from 'react-redux';
import Cell from './Cell';
// import { cookie } from 'redux-effects-universal-cookie';


class Row extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isEnterForPercent: false, // value which is used for choosing which values put inside cells === numbers / percents
      summ: 0,
      percents: []
    }
  }

  countSummOfCells(allValues, row) {
    let total = row.cells.reduce(function(sum, current) {   
      return sum + allValues[current];
    }, 0);
    this.setState({
      summ: total
    })
  }
  countPercents(allValues, row) {
    let percensRow = [];
    let total = row.cells.reduce(function(sum, current) {   
      return sum + allValues[current];
    }, 0);
    row.cells.forEach((cellId, i) => {
      percensRow.push({id: i, number: Math.round(allValues[cellId]/total*100)}) 
    })   
    this.setState({
      percents: percensRow
    }) 
  }
  
  // show percents inside cells
  hidePercent() {
    this.setState({
      isEnterForPercent: !this.state.isEnterForPercent
    })
  }

  // number of cells will rise +1 by every click
  // summ of the row will also change as so mean values in bottom of the table
  changeValues(event) {
    const index = this.props.row.cells.indexOf(+event.target.dataset.id)
    const clickedCell = this.props.row.cells[index];
    this.props.changeNumbers(this.props.index, index, clickedCell)
    // this.props.setCookies(clickedCell, this.props.allValues[clickedCell].number) // setting the cookie
  }
  
  // function called by mouse on some number cell
  // it will highlight x values 
  // number x we get from default integers in global store
  lingthUpSomeValues(event) { 
    this.props.higlightCells(+event.target.dataset.id, this.props.defaultIntegers.x, this.props.allValues)
  }

  // function called on mouse out from cell
  // this func cler all highlighted cells 
  clearLightedValues() {
    this.props.unhiglightCells() 
  }

  componentWillMount() {
    this.countSummOfCells(this.props.allValues, this.props.row)
    this.countPercents(this.props.allValues, this.props.row)
  }
    
  componentWillReceiveProps(nextProps) {
    this.countSummOfCells(nextProps.allValues, this.props.row)
    this.countPercents(this.props.allValues, this.props.row)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.isEnterForPercent !== nextState.isEnterForPercent) {
      return true
    } else if(this.props.allValues !== nextProps.allValues) {
      return true
    } else if(this.props.allValues !== nextState.allValues && this.props.highlight.highlight !== nextProps.highlight.highlight) {
      return true
    } else if(this.props.index !== nextProps.index){
      return true
    } else {
      return false
    }
  }
 

  render() {
    const renderNumbers = this.props.row.cells.map((cell, index)  => {
      return (
        <Cell 
          key={cell}
          id={cell}
          value={this.props.allValues[cell]}
          highlight={this.props.highlight.cells[index].highlight}
          changeValues={this.changeValues.bind(this)}
          lingthUpSomeValues={this.lingthUpSomeValues.bind(this)}
          clearLightedValues={this.clearLightedValues.bind(this)}
        />
      )
    })
    const renderPercents = this.state.percents.map((value) => {
      return (
        <Cell 
          key={value.id} 
          value={value}
          isEnterForPercent={this.state.isEnterForPercent}
        />
      )
    })
    const result = (this.state.isEnterForPercent) ? (renderPercents) : (renderNumbers);
    return (
      <tr data-id={this.props.row.id}>
        <th>{this.props.index+1}</th>
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
            data-id={this.props.row.id}
          >
            Delete row
          </button>
        </td>
      </tr>
    )
  }
}


// const setCookies = (id, value) => {
//   let date = new Date(new Date().getTime() + 60 * 1000); // cookie will live only 60 seconds
//   return cookie(id, value, {expires: date})
// }
const changeNumbers = (rowIndex, index, clickedCell) => {
  const payload = {rowIndex, index, clickedCell}
  return ({ type: 'CHANGE_NUMBERS', payload})
}
const higlightCells = (id, x, values) => {
  const payload = {id, x, values};
  return ({ type: 'HIGHLIGHT_CELLS', payload})
}
const unhiglightCells = () => {
  return ({ type: 'UNHIGHLIGHT_CELLS'})
}


const mapDispatchToProps = {
  higlightCells,
  unhiglightCells,
  // setCookies,
  changeNumbers
}

const mapStateToProps = (state) => {
  return {
    defaultIntegers: state.defaultIntegers,
    allValues: state.allValues,
    // highlight: state.highlight
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Row);