import React, { Component } from 'react';

class Snippet extends Component {
  render() {
    return (
      <div>
        <b>Coordenadas</b><br />
        Latitud: {this.props.point.latitude}<br />
        Longitud: {this.props.point.longitude}
      </div>
    )
  }
}

export default Snippet;