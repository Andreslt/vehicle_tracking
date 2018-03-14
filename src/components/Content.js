import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapComponent from './Map';
import { liveRoadmap } from '../actionCreators'
import fB from '../firebase-client';

class Content extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentRoute && this.props.currentRoute !== nextProps.currentRoute) {
      if (this.props.currentRoute) {
        fB.child(this.props.currentRoute).off()
      }
    }

    const cuRef = fB.child(nextProps.currentRoute);
    cuRef.limitToLast(5).on('value', snap => {
      const points = snap.val()
      this.setState({
        roadmap: points // Object.keys(points).map(key => points[key])
      })
    })
  }

  state = {};
  render() {
    return (
      <div className="content">
        <p>Hello Content</p>
        <MapComponent {...this.props} roadmap={this.state.roadmap} />
        <div>HELLOUU</div>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    map: state.routes.mapProps,
    currentRoute: state.routes.currentRoute,
    roadmap: state.routes.roadmap
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reloadRoute(route) {
      dispatch(liveRoadmap(route))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);