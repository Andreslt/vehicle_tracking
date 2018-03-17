import React, { Component } from 'react';
import { connect } from 'react-redux';
import Content from '../dump/Content';

class ContentContainer extends Component {

  render() {
    return ( <Content {...this.props}/>)
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