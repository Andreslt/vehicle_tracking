import React, { Component } from 'react';
import './styles.css';
import { Header, Sidebar, Content } from '../components/smart';
import { compose } from "recompose";

const Main = compose(
  props => {
    return (
      <div className="App">
        <Header />
        <div className="App-main">
          <Sidebar />
          <Content />
        </div>
      </div>
    )
  })

export default Main
