import React from 'react';
import { compose, withProps, withStateHandlers } from "recompose";
import './styles.css';

const Navbar = compose(
  withProps({

  })
)(props => {
  return (
    <nav className="header">
      <h1> hello moto </h1>
    </nav>
  )
})

export default Navbar 