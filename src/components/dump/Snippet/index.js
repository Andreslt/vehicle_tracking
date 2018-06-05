import React, { Component } from 'react';

class Snippet extends Component {
  render() {
    return (
      <div>
        <b>Coordenadas</b>{!!this.props.point.bulk && <b> (Retransmitido)</b>}<br />
        Latitud: {this.props.point.lat}<br />
        Longitud: {this.props.point.lng}<br />
        Altitud: {this.props.point.altitude}<br />
        Velocidad: {this.props.point.speed}<br />
        timestamp: {this.props.point.sent_tsmp}     
      </div>
    )
  }
}

export default Snippet;