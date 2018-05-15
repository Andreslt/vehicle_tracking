import React, { Component } from 'react';
import { connect } from 'react-redux';
import { vehicleInfo, currentVehicle, exportTrailCSV, vehicleSnapshot } from '../../actionCreators';
// import { compose, withProps, withStateHandlers } from "recompose";
import Card, { CardHeader, CardMedia, CardContent } from 'material-ui/Card';
import { Typography, IconButton, Avatar, Button, TextField, Divider } from 'material-ui';
// import Slide from 'material-ui/transitions/Slide';
import { Clear, DirectionsBus, Close as CloseIcon, Folder as FolderIcon, Pageview as PageviewIcon, Assignment as AssignmentIcon, PhotoCamera, FileDownload } from 'material-ui-icons';
// import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { CSVLink, CSVDownload } from 'react-csv';
import moment from 'moment';
import { CircularProgress } from 'material-ui/Progress';
import Fade from 'material-ui/transitions/Fade';
import Snackbar from 'material-ui/Snackbar';
/*
function Transition(props) {
  return <Slide direction="up" {...props} />;
}
*/
class InfoPanel extends Component {

  state = {
    openDialog: false,
    startingDate: null,
    endingDate: null,
    invalidDates: false,
    csvData: false,
    csvDataError: false
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

  generateCSV = (vehicle) => () => {
    const currentTime = moment(Date.now()).format();
    const startingDate = (this.state.startingDate) ? moment(this.state.startingDate).format() : currentTime;
    const endingDate = (this.state.endingDate) ? moment(this.state.endingDate).format() : currentTime;

    let check = false;

    if (startingDate && endingDate) {
      const startingDateUnix = moment().unix(startingDate);
      const endingDateUnix = moment().unix(endingDate);
      if (startingDateUnix <= endingDateUnix) {
        check = true
        this.setState({ csvData: true, csvDataError: false })
        this.props.exportTrailCSV(vehicle, startingDate, endingDate)
      }
    }
    if (!check) this.setState({ invalidDates: true })
  };

  datePicked = event => {
    this.setState({ invalidDates: false })
    this.setState({ [event.target.id]: event.target.value })
  }

  handleCloseSnackbar = () => {
    this.setState({ csvData: false })
  }

  handleModal = () => {
    this.props.vehicleSnapshot(true);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.csvData) this.setState({ csvData: true });
    if (nextProps.csvDataError) this.setState({ csvDataError: true });
    this.setState({ csvLoading: nextProps.csvLoading });
  }

  render() {
    const currentDate = moment().format('YYYY-MM-DDThh:mm');
    const {
      currentVehicle,
      /*csvLoading,
      csvData*/
    } = this.props;
    const vehicle = currentVehicle[Object.keys(currentVehicle)[0]];
    return (
      <div id="infoPanelID" style={{ float: 'right', width: '300px', height: '535px' }}>
        <Card>
          <CardHeader
            title={
              <Typography style={{ marginRight: '20px' }} variant="title" > Vehicle ID {vehicle.id}</Typography>
            }
            style={{ margin: 0 }}
            subheader={moment().format('Do MMMM YYYY')}
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
            {this.state.invalidDates &&
              <Typography
              >
                Verificar rango de fechas.
              </Typography>}
            {this.state.csvDataError &&
              <Typography
              >
                Los resultados no contienen registros. Verifique los parámetros de búsqueda.
              </Typography>}
            <div>
              <Fade
                in={this.state.csvLoading}
                style={{ transitionDelay: this.state.csvLoading ? '800ms' : '0ms' }}
                unmountOnExit
              >
                <CircularProgress />
              </Fade>
              {this.state.csvLoading ?
                <Typography >
                  Descargando archivo CSV. Esta operación puede tardar unos minutos.
              </Typography> : ''}
            </div>
            <Button              
              variant="raised" color="secondary" style={{ flex: 1 }}
            > Ver Ruta
            </Button>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px', display: 'flex' }}>
              <IconButton
                aria-label="Download CSV"
                style={{ flex: 1 }}
                title={'Descargar CSV'}
                disabled={false}
                onClick={this.generateCSV(vehicle)}
              >
                CSV
                <FileDownload />
              </IconButton>
              <IconButton
                aria-label="Live Camera"
                style={{ flex: 1 }}
                onClick={this.handleModal}
              >
                CAM
                <PhotoCamera />
              </IconButton>
            </div>
          </CardContent>
        </Card>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={this.state.csvData && !this.state.csvLoading && !this.state.csvDataError}
          onClose={this.handleCloseSnackbar}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Archivo descargado.</span>}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    vehicleInfo: state.vehicles.vehicleInfo,
    currentVehicle: state.vehicles.currentVehicle,
    liveRecording: state.vehicles.liveRecording,
    csvData: state.trails.csvData,
    csvDataError: state.trails.csvDataError,
    csvLoading: state.trails.csvLoading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    vehicleInfo(state) {
      dispatch(vehicleInfo(state));
    },
    vehicleSnapshot(state) {
      dispatch(vehicleSnapshot(state));
    },
    exportTrailCSV(vehicle, startingDate, endingDate) {
      dispatch(exportTrailCSV(vehicle, startingDate, endingDate));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(InfoPanel);