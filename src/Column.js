import React, { Component }  from 'react';

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        position: 'relative', 
        backgroundColor: 'blue', 
        width: '100%',
        height: '100%', 
        paddingTop: this.props.columnObject.number 
      }
    }
  }

  render() {
    return (  
      <td 
        className={(this.props.columnObject.highlighted) ? ("table-primary") : ("table-light")}
        id={this.props.columnObject.id} 
        onClick={this.props.changeValues}
        onMouseOver={this.props.lingthUpSomeValues}
        onMouseOut={this.props.clearLightedValues}
        >
          {this.props.columnObject.number}
        <div
          id={this.props.columnObject.id} 
          style={this.props.isEnterForPercent ? (this.state.style) : ({display: 'none'}) }
        >
        </div>
      </td>
    );
    
  }
}

export default Column;