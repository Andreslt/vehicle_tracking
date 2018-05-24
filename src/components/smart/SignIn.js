import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from "recompose";
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Logo from '../../smartsealsco_logo.jpeg';

import { auth } from '../../firebase';
import { LANDING } from '../../routes';

const INITIAL_STATE = { email: '', password: '', error: null };

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margintTop: theme.spacing.unit * 3,
  }),
  button: {
    margin: theme.spacing.unit,
    width: 256,
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
      <div style={{ display: "flex", flexDirection: "column",  alignItems: "center" }}>
        <Paper className={classes.root}>
          <img src={Logo} alt="" style={{ width: 256 }}/>
          <Typography variant="headline" color="primary" style={{ fontSize: "2rem" }}>Sign In</Typography>
          <form style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
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
        </Paper>
      </div>
    );
  }

}

export default compose(withRouter, withStyles(styles))(SignInPage);