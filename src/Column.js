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
    const className = this.props.isEnterForPercent ? ("table-light") : ((this.props.allValues[this.props.columnObject].highlighted) ? ("table-primary") : ("table-light"));
    return (  
      <td 
        className={className}
        data-id={this.props.columnObject} 
        onClick={this.props.changeValues}
        onMouseOver={this.props.lingthUpSomeValues}
        onMouseOut={this.props.clearLightedValues}
        >
          {this.props.isEnterForPercent ? (this.props.columnObject.number) : (this.props.allValues[this.props.columnObject].number)}
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