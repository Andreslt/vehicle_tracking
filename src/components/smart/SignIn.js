import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from "recompose";
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import { auth } from '../../firebase';
import { LANDING } from '../../routes';

const INITIAL_STATE = { email: '', password: '', error: null };

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 256,
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
      <div>
        <h1>Sign In</h1>
        <form>
          <TextField
            type="email"
            id="email"
            label="E-mail"
            className={classes.textField}
            value={email}
            onChange={this.handleChange('email')}
            margin="normal"
          />
          <TextField
            type="password"
            id="password"
            label="Password"
            className={classes.textField}
            value={password}
            onChange={this.handleChange('password')}
            margin="normal"
          />
          <Button variant="raised" disabled={isInvalid} className={classes.button} onClick={this.handleSubmit}>Sign In</Button>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }

}

export default compose(withRouter, withStyles(styles))(SignInPage);