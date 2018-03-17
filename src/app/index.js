import React, { Component } from 'react';
import './styles.css';

import { Header, Sidebar, Content } from '../components/smart';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <div className="App-main">
          <Sidebar />
          <Content />
        </div>
      </div>
    );
  }
}

export default App;
