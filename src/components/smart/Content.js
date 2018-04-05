import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from '../dump/Map';

class ContentContainer extends Component {

  render() {
    return (
      <Map {...this.props} />
    )
  }
};

const mapStateToProps = state => {
  return {
    map: state.zones.currentZone.mapProps,
    trail: state.trails.data,
  }
}

export default connect(mapStateToProps)(ContentContainer);