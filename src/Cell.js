import React, { Component }  from 'react';

class Cell extends Component {
 
  render() {
    const className = this.props.isEnterForPercent ? ("table-light") : ((this.props.highlight) ? ("table-primary") : ("table-light"));
    return (  
      <td 
        className={className}
        data-id={this.props.id} 
        onClick={this.props.changeValues}
        onMouseOver={this.props.lingthUpSomeValues}
        onMouseOut={this.props.clearLightedValues}
        >
          {this.props.isEnterForPercent ? (`${this.props.value.number}%`) : (this.props.value)}
        <div
          id={this.props.value.id} 
          style={this.props.isEnterForPercent ? ({backgroundColor: 'blue', paddingTop: `${this.props.value.number}%`}) : ({display: 'none'}) }
        >
        </div>
      </td>
    );
    
  }
}

export default Cell;

