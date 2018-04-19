import React, { Component } from 'react';
import { connect } from 'react-redux';
import { vehicleInfo, currentVehicle, exportTrailCSV } from '../../actionCreators';
import { compose, withProps, withStateHandlers } from "recompose";
import Card, { CardHeader, CardMedia, CardContent } from 'material-ui/Card';
import { Typography, IconButton, Avatar, Button, TextField, Divider, Dialog, Toolbar, AppBar } from 'material-ui';
import Slide from 'material-ui/transitions/Slide';
import { Clear, DirectionsBus, Close as CloseIcon } from 'material-ui-icons';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CSVLink, CSVDownload } from 'react-csv';
import moment from 'moment';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class InfoPanel extends Component {

  state = {
    openDialog: false,
    csvData: '',
    startingDate: null,
    endingDate: null
  };

  closePanel = () => () => {
    this.props.vehicleInfo(false);
  }

  handleClickOpenDialog = () => {
    this.setState({ openDialog: true });
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  generateCSV = (zoneId, vehicleId) => () => {
    this.props.exportTrailCSV(zoneId, vehicleId, this.state.startingDate, this.state.endingDate)
  };

  datePicked = event => {
    this.setState({ [event.target.id]: event.target.value })
  }
  
  render() {
    const currentDate = moment().format('YYYY-MM-DDThh:mm');
    const startDate = moment([moment().format('YYYY'), moment().format('MM') - 1]);
    const endDate = moment(startDate).endOf('month');
    console.log('** startDate -> ', startDate.toDate());
    console.log('** endDate -> ', endDate.toDate());
    
    return (
      <div id="infoPanelID" style={{ float: 'right', width: '300px', height: '535px' }}>
        <Card>
          <CardHeader
            title={
              <Typography style={{ marginRight: '20px' }} variant="title" > Vehicle ID {this.props.currentVehicle.id}</Typography>
            }
            style={{ margin: 0 }}
            subheader="September 14, 2016"
            avatar={
              <div>
                <Avatar aria-label="Recipe" style={{ backgroundColor: 'rgb(19, 148, 255)', marginRight: 0 }}>
                  <DirectionsBus />
                </Avatar>
              </div>
            }
            action={
              <IconButton
                onClick={this.closePanel()}
              >
                <Clear />
              </IconButton>
            }
          />
          <Divider />
          <CardMedia
            image="/static/images/cards/paella.jpg"
            title="Contemplative Reptile"
          />
          <CardContent
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <Typography>
              <b>Por favor seleccione el rango de fechas a consultar</b>
            </Typography><br />
            <form noValidate style={{ marginBottom: '25px', flex: 1 }}>
              <TextField
                id="startingDate"
                label="Desde"
                type="datetime-local"
                defaultValue={currentDate}
                onChange={this.datePicked}
              />
              <TextField
                id="endingDate"
                label="Hasta"
                type="datetime-local"
                defaultValue={currentDate}
                onChange={this.datePicked}
              />
            </form>
              <Button
                onClick={this.generateCSV(this.props.vehicleZoneId, this.props.currentVehicle.id)}
                variant="raised" color="secondary" style={{ flex: 1 }}
              > Descargar CSV
            </Button>
          </CardContent>
          {/* <Dialog
          open={this.props.liveRecording}
          transition={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"                    
          >
            hello
          </Dialog> */}
          {/*            <Carousel
          >
            <div>
              <img src="http://lorempixel.com/output/cats-q-c-640-480-1.jpg" />
              <p className="legend">Legend 1</p>
            </div>
            <div>
              <img src="http://lorempixel.com/output/cats-q-c-640-480-2.jpg" />
            </div>
            <div>
              <img src="http://lorempixel.com/output/cats-q-c-640-480-2.jpg" />
            </div>
            <div>
              <img src="http://lorempixel.com/output/cats-q-c-640-480-2.jpg" />
            </div>
            <div>
              <img src="http://lorempixel.com/output/cats-q-c-640-480-2.jpg" />
            </div>
            <div>
              <img src="http://lorempixel.com/output/cats-q-c-640-480-2.jpg" />
            </div>
            <div>
              <img src="http://lorempixel.com/output/cats-q-c-640-480-2.jpg" />
            </div>
          </Carousel>  */}
          {/*          <Dialog
            fullScreen
            open={this.state.openDialog}
            onClose={this.closeDialog}
            transition={Transition}
          >
          <AppBar
          color='primary'
          >
            <Toolbar color='blue'>
              <IconButton color="inherit" onClick={this.handleCloseDialog} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit">
                Sound
              </Typography>
            </Toolbar>
          </AppBar>
          </Dialog>*/}
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    vehicleInfo: state.vehicles.vehicleInfo,
    currentVehicle: state.vehicles.currentVehicle,
    vehicleZoneId: state.vehicles.vehicleZoneId,
    liveRecording: state.vehicles.liveRecording,
    trailCSVData: state.vehicles.trailCSVData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    vehicleInfo(state) {
      dispatch(vehicleInfo(state));
    },
    exportTrailCSV(zoneId, vehicleId, startingDate, endingDate) {
      dispatch(exportTrailCSV(zoneId, vehicleId, startingDate, endingDate));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(InfoPanel);