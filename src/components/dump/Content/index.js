import React from 'react';
import { compose } from "recompose";

import './styles.css';
import MapComponent from '../Map';

const Content = compose(
  props => {
    return (
      <div className="content">
        <MapComponent {...props} />
      </div>
    )
  })

export default Content 