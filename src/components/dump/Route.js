import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { SIGN_IN, LANDING } from '../../routes';

const CustomRoute = ({ type, component: Component, authenticated, ...rest }) => (
  <Route {...rest} render={props => {
    // No auth and is public, or, auth and is not public
    if (!authenticated !== (type !== 'public')) {
      return <Component {...rest} {...props}/>;
    } else {
      return (
        <Redirect to={{
          pathname: type === 'public' ? LANDING : SIGN_IN,
          state: { from: props.location },
        }}/>
      );
    }
  }}>
  </Route>
);

CustomRoute.defaultProps = {
  type: 'public',
  authenticated: false,
};

export default CustomRoute;