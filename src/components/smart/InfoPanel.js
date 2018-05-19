import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  vehicleInfo,
  exportTrailCSV,
  vehicleSnapshot,
  printRoute,
  clearRoute,
  clearAllTrails
} from '../../actionCreators';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import { Typography, IconButton, Avatar, Button, TextField, Divider } from 'material-ui';
import { Clear, DirectionsBus, PhotoCamera, FileDownload } from 'material-ui-icons';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import moment from 'moment';
import { CircularProgress } from 'material-ui/Progress';
import Fade from 'material-ui/transitions/Fade';
import Snackbar from 'material-ui/Snackbar';

class InfoPanel extends Component {

  state = {
    openDialog: false,
    startingDate: null,
    endingDate: null,
    invalidDates: false,
    csvData: false,
    csvDataError: false,
    printRouteInvalid: false,
    buildingRoute: false
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
    const { check, startingDate, endingDate } = this.validateEntryDates();
    if (!check) this.setState({ invalidDates: true })
    else {
      this.setState({ csvData: true, csvDataError: false })
      this.props.exportTrailCSV(vehicle, startingDate, endingDate)
    }
  };

  validateEntryDates = () => {
    const currentTime = moment(Date.now()).format();
    const startingDate = (this.state.startingDate) ? moment(this.state.startingDate).format() : currentTime;
    const endingDate = (this.state.endingDate) ? moment(this.state.endingDate).format() : currentTime;

    let check = false;
    if (startingDate && endingDate) {
      if (startingDate <= endingDate) {
        check = true
      }
    }
    return { check, startingDate, endingDate };
  }

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

  printRoute = () => {
    const { check, startingDate, endingDate } = this.validateEntryDates();
    if (!check) this.setState({ invalidDates: true })
    else {
      this.props.clearAllTrails();
      this.setState({ buildingRoute: true });
      this.props.printRoute(this.props.currentVehicle, startingDate, endingDate);
    }
  }

  clearRoute = () => {
    this.props.clearRoute();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.csvData) this.setState({ csvData: true });
    if (nextProps.csvDataError) this.setState({ csvDataError: true });
    if (nextProps.trailMode !== 'none') this.setState({ printRouteInvalid: true });
    else this.setState({ printRouteInvalid: false });
    if (nextProps.printedRoute) this.setState({ buildingRoute: false })

    this.setState({ csvLoading: nextProps.csvLoading });
  }

  render() {
    const currentDate = moment().format('YYYY-MM-DDThh:mm');
    const { currentVehicle } = this.props;
    return (
      <div id="infoPanelID" style={{ float: 'right', width: '300px', height: '535px' }}>
        <Card>
          <CardHeader
            title={
              <Typography style={{ marginRight: '20px' }} variant="title" > ID Vehículo {currentVehicle.id}</Typography>
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
            <div>
              <Fade
                in={this.state.buildingRoute}
                style={{ transitionDelay: !this.props.buildingRoute ? '800ms' : '0ms' }}
                unmountOnExit
              >
                <CircularProgress />
              </Fade>
              {this.state.buildingRoute ?
                <Typography >
                  Reconstruyendo recorrido. Esta operación puede tardar unos minutos.
              </Typography> : ''}
            </div>
            <Button
              disabled={this.state.printRouteInvalid}
              onClick={!!this.props.printedRoute ? this.clearRoute : this.printRoute}
              variant="raised" color="secondary" style={{ flex: 1 }}
            >
              {!!this.props.printedRoute ? 'Ocultar Ruta' : 'Ver Ruta'}
            </Button>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px'}}>
              <IconButton
                aria-label="Download CSV"
                style={{ flex: 1 }}
                title={'Descargar CSV'}
                disabled={false}
                onClick={this.generateCSV(currentVehicle)}
              >
                CSV
                <FileDownload />
              </IconButton>
              <IconButton
                aria-label="Live Camera"
                style={{ flex: 1 }}
                onClick={this.handleModal}
                disabled={!!currentVehicle.src ? false : true}
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
    printedRoute: state.vehicles.printedRoute,
    trailMode: state.trails.mode,
    liveRecording: state.vehicles.liveRecording,
    csvData: state.trails.csvData,
    csvDataError: state.trails.csvDataError,
    csvLoading: state.trails.csvLoading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    printRoute(vehicle, startingDate, endingDate) {
      dispatch(printRoute(vehicle, startingDate, endingDate));
    },
    clearRoute() {
      dispatch(clearRoute());
    },
    clearAllTrails() {
      dispatch(clearAllTrails());
    },
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