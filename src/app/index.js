import React, { Component } from 'react';
import './styles.css';

import { Layout, Content, Sidebar } from '../components/smart';
import dump from '../components/dump';
const { Header } = dump

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout
        Header = {Header}
        Sidebar = {Sidebar}
        Content = {Content}
        />
      </div>
    );
  }
}

export default App;
