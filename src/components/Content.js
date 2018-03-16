import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapComponent from './Map';

class Content extends Component {

  render() {
    return (
      <div className="content">
        <MapComponent {...this.props}/>
      </div>
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

export default connect(mapStateToProps)(Content);