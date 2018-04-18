import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';

import { Layout, Content, Sidebar } from '../components/smart';
import dump from '../components/dump';
const { Header } = dump

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout
          {...this.props}
          Header={Header}
          Sidebar={Sidebar}
          Content={Content}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    vehicleInfo: state.vehicles.vehicleInfo,
    liveRecording: state.vehicles.liveRecording,
  }
}

export default connect(mapStateToProps)(App);
