import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from "recompose";
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Logo from '../../img/logo-smart-seals.svg';
import Logo2 from '../../img/sts-logo.svg';

import { auth } from '../../firebase';
import { LANDING } from '../../routes';

const INITIAL_STATE = { email: '', password: '', error: null };

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    position: 'relative'
  },
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 40px 35px',
    width: 400,
    borderRadius: 9,
    boxShadow: '1px 1px 50px 50px rgba(124,123,123, 0.1)',
  },
  logo: {
    width: 180,
    margin: '10px auto 30px'
  },
  button: {
    marginTop: 5 * theme.spacing.unit,
    paddingTop: 2.5 * theme.spacing.unit,
    paddingBottom: 2.5 * theme.spacing.unit,
    backgroundColor: '#0dc873',
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
    borderRadius: 9,
  },
  textField: {
    paddingTop: 1.5 * theme.spacing.unit,
    paddingBottom: 1.25 * theme.spacing.unit,
    color: '#b5b5b5',
  },
  logo2: {
    position: 'absolute',
    right: 50,
    bottom: 50,
    width: 140,
  },
});

class SignInPage extends Component {
  
  state = { ...INITIAL_STATE };

  handleChange = field => ({ target: { value } }) => this.setState({ [field]: value });

  handleSubmit = async event => {
    const { history } = this.props;
    const { email, password } = this.state;
    try {
      await auth.signIn(email, password);
      this.setState({ ...INITIAL_STATE });
      history.push(LANDING);
    } catch(error) {
      this.setState({ error });
    }
    event.preventDefault();
  };

  render() {
    const { classes } = this.props;
    const { email, password, error } = this.state;
    const isInvalid = email === '' || password === '';
    return (
      <div className={classes.root}>
        <div className={classes.base}>
          <Paper className={classes.form}>
            <img src={Logo} alt="" className={classes.logo}/>
            <TextField
              type="email"
              id="email"
              label="EMAIL ADDRESS"
              className={classes.textField}
              value={email}
              onChange={this.handleChange('email')}
            />
            <TextField
              type="password"
              id="password"
              label="PASSWORD"
              className={classes.textField}
              value={password}
              onChange={this.handleChange('password')}
            />
            <Button
              variant="raised"
              size="large"
              disabled={isInvalid}
              className={classes.button}
              onClick={this.handleSubmit}
            >
              LOGIN
            </Button>
            {error && <p>{error.message}</p>}
          </Paper>
        </div>
        <img src={Logo2} alt="" className={classes.logo2}/>
      </div>
    );
  }

}

export default compose(withRouter, withStyles(styles))(SignInPage);