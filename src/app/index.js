import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { CircularProgress } from 'material-ui/Progress';

import './styles.css';
import { LANDING, SIGN_IN } from '../routes';
import { firebaseAuth as auth, getUserProfile } from '../firebase';
import { Layout, Content, Sidebar, SignIn } from '../components/smart';
import { Header, Route } from '../components/dump';

import {
  setCurrentUser
} from '../actionCreators';

const Landing = props => {
  return (
    <Layout
      {...props}
      Header={Header}
      Sidebar={Sidebar}
      Content={Content}
      onLogout={() => auth.signOut()}
    />
  );
};

class App extends Component {

  state = {
    authUser: null,
    validatedAuth: false,
  };

  componentDidMount() {
    auth.onAuthStateChanged(async authUser => {
      const user = authUser || null;
      if (user) {
        try {
          const userProfile = await getUserProfile(user.uid);
          this.props.setCurrentUser({ uid: user.uid , ...userProfile});
        } catch (e) {
          console.error(e);
        }
      }
      this.setState({ authUser: user, validatedAuth: true });
    })
  }

  render() {
    const { authUser, validatedAuth } = this.state;
    if (!validatedAuth) {
      return (
        <div className="App" style={{ alignItems: "center" }}>
          <CircularProgress />
        </div>
      );
    }
    return (
      <Router>
        <div className="App">
          <Route
            exact path={LANDING}
            type="private"
            authenticated={authUser}
            {...this.props}
            component={Landing}
          />
          <Route
            exact path={SIGN_IN}
            authenticated={authUser}
            component={SignIn}
          />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    vehicleInfo: state.vehicles.vehicleInfo,
    liveRecording: state.vehicles.liveRecording,
  }
};

const mapDispatchToProps = dispatch => ({
  setCurrentUser(userInfo) {
    dispatch(setCurrentUser(userInfo));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
