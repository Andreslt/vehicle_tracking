import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppBar } from 'material-ui';
import Dialog from 'material-ui/Dialog';
import Tabs, { Tab } from 'material-ui/Tabs';
import { vehicleSnapshot } from '../../actionCreators';
import { Close as CloseIcon } from 'material-ui-icons'; import Slide from 'material-ui/transitions/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class SnapModal extends Component {
  state = {
    open: true,
    tabValue: 'video'
  };

  selectTab = tab => () => {
    this.setState({ tabValue: tab });
  }

  handleClose = () => {
    this.setState({ open: false });
    this.props.closeModal();
  }

  imgUrl = () => {
    if (!this.props.liveRecording) return null;
    const src = this.props.currentVehicle.src;
    return src[this.state.tabValue]
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
                <Tab label="VIDEO" onClick={this.selectTab('video')} />
                <Tab label="INSTANTANEA" onClick={this.selectTab('img')} />
                <Tab
                  style={{ position: 'absolute', right: '1%' }}
                  icon={<CloseIcon />}
                  onClick={this.handleClose}
                />
              </Tabs>
            </AppBar>
            <div>
              <img alt="source" src={this.imgUrl()} style={{ maxWidth: '100%' }} />
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentVehicle: state.vehicles.currentVehicle,
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