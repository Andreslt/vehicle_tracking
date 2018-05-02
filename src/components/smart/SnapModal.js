import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppBar, Button, Toolbar, IconButton, Typography } from 'material-ui';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Card, { CardHeader, CardMedia, CardContent } from 'material-ui/Card';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Tabs, { Tab } from 'material-ui/Tabs';
import { vehicleSnapshot } from '../../actionCreators';
import { Close as CloseIcon } from 'material-ui-icons'; import Slide from 'material-ui/transitions/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const camLinks = ['http://186.146.26.224:8080/zm/cgi-bin/nph-zms?mode=jpeg&monitor=2$scale=100&maxfps=6&user=admin&pass=admin123', 'http://186.146.26.224:8080/zm/cgi-bin/nph-zms?mode=single&monitor=2$scale=100&maxfps=6&user=admin&pass=admin123'] // 0: Video, 1: Image

class SnapModal extends Component {
  state = {
    open: true,
    tabValue: 0
  };

  selectTab = tab => () => {
    this.setState({ tabValue: tab });
  }

  handleClose = () => {
    this.setState({ open: false });
    this.props.closeModal();
  }

  imgUrl = () => {
    return this.state.open ? camLinks[this.state.tabValue] : '';
  };

  render() {
    return (
      <div>
        <Dialog
          fullScreen
          open={this.props.liveRecording || false}
          transition={Transition}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <div>
            <AppBar position="static">
              <Tabs value={this.state.tabValue}>
                <Tab label="VIDEO" onClick={this.selectTab(0)} />
                <Tab label="INSTANTANEA" onClick={this.selectTab(1)} />
                <Tab
                  style={{ position: 'absolute', right: '1%' }}
                  icon={<CloseIcon />}
                  onClick={this.handleClose}
                />
              </Tabs>
            </AppBar>
            <div>
              <img src={this.imgUrl()} style={{ maxWidth: '100%' }} />
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    liveRecording: state.vehicles.liveRecording
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal() {
      dispatch(vehicleSnapshot(false))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SnapModal);