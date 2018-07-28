import React, { Component }  from 'react';

class Column extends Component {
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
          {this.props.isEnterForPercent ? (`${this.props.columnObject.number}%`) : (this.props.allValues[this.props.columnObject].number)}
        <div
          id={this.props.columnObject.id} 
          style={this.props.isEnterForPercent ? ({backgroundColor: 'blue', paddingTop: `${this.props.columnObject.number}%`}) : ({display: 'none'}) }
        >
        </div>
      </td>
    );
    
  }
}

export default Column;