import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import Map from '../dump/Map';
import { addGeoFence } from '../../actionCreators';

class ContentContainer extends Component {
  render() {
    return (
      <Map {...this.props} />
    )
  }
}

const mapStateToProps = state => ({
  currentZone: state.zones.currentZone,
  trails: state.trails,
  vehicles: state.vehicles,  
  drawnKML: state.zones.drawnKML,
  mapMode: state.map.mode,
  geoFences: state.geoFences,
});

const mapDispatchToProps = dispatch => ({
  addGeoFence: bindActionCreators(addGeoFence, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentContainer);