import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from '../dump/Map';

class ContentContainer extends Component {
  render() {
    return (
      <Map
        {...this.props}
      />
    )
  }
};

const mapStateToProps = state => {
  return {
    map: state.zones.currentZone.mapProps,
    trails: state.trails.data,
    multiTrackingMode: state.trails.multiTrackingMode
  }
}

export default connect(mapStateToProps)(ContentContainer);