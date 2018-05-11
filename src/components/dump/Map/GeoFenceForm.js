import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class GeoFenceForm extends Component{

  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
  }

  handleChange = field => ({ target: { value } }) => this.setState({ [field]: value });

  handleSave = () => {
    const { name, radius, latitude, longitude } = this.state;
    const radiusNumber = Number(radius);
    if (!name || radiusNumber < 10) {
      return;
    }
    console.log("newMaker", { name, radius, latitude, longitude });
    this.props.onSave({ name, radius: radiusNumber, latitude, longitude });
  };

  render() {
    const { classes } = this.props;
    const { name, radius, latitude, longitude } = this.state;
    return (
      <div className={classes.root}>
        <Typography variant="headline">Agregar geo-fence</Typography>
        <Typography>Lat/Lng: <strong>{latitude}, {longitude}</strong></Typography>
        <TextField
          margin="normal"
          className={classes.textField}
          label="Nombre"
          value={name}
          onChange={this.handleChange("name")}
        />
        <TextField
          margin="normal"
          className={classes.textField}
          type="number"
          label="Radio"
          min={10}
          value={radius}
          onChange={this.handleChange("radius")}
        />
        <Button variant="raised" color="primary" size="small" className={classes.button} onClick={this.handleSave}>
          Guardar
        </Button>
      </div>
    );
  }

}

export default withStyles(styles)(GeoFenceForm);