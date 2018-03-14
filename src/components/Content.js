import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapComponent from './Map';
import { liveRoadmap } from '../actionCreators'

class Content extends Component {
  // componentDidMount(){
  //   // console.log('Content.cdm -> ', this.props);
  //   this.props.reloadRoute(this.props.currentRoute);
  // }

  // componentWillReceiveProps(nextProps){
  //   console.log('Content.cwrp -> ', this.props.currentRoute, nextProps.currentRoute);
  // }

  state = {};
  render() {
    return (
      <div className="content">
        <p>Hello Content</p>
        <MapComponent {...this.props}/>
        <div>HELLOUU</div>
      </div>
    )
  }
};

const mapStateToProps = state =>{
  return{
    map: state.routes.mapProps,
    currentRoute: state.routes.currentRoute,
    roadmap: state.routes.roadmap
  }
}

const mapDispatchToProps = dispatch => {
  return{
    reloadRoute(route){
      dispatch(liveRoadmap(route))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);