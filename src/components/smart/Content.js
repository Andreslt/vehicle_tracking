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
    map: state.routes.map,
    routes: state.routes.data,
    trail: state.trails,
  }
}

export default connect(mapStateToProps)(ContentContainer);