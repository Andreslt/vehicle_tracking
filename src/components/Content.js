import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapComponent from './Map';

class Content extends Component {
  state = {};
  render() {
    // console.log(this.props.mapProps)
    return (
      <div className="content">
        <p>Hello Content</p>
        <MapComponent {...this.props.mapProps}/>
        <div>HELLOUU</div>
      </div>
    )
  }
};

const mapStateToProps = state =>{
  return{
    mapProps: state.routes.mapProps
  }
}

export default connect(mapStateToProps)(Content);