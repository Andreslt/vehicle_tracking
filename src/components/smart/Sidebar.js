import React, { Component } from 'react';
import { fetchRoutes, printRoute, printRouteTrail } from '../../actionCreators';
import { connect } from 'react-redux';
import Sidebar from '../dump/Sidebar'

class SidebarContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      activeKey: '1',
      realtime: true
    };
  }

  componentDidMount() {
    this.props.fetchRoutes();
  }

  handleSelect(activeKey) {
    this.setState({ activeKey });
  }

  render() {
    return (
      <div>
        <Sidebar {...this.props} handleSelect={this.handleSelect} />
        <button onClick={() => {
          console.log('1_this.props.realtime-> ', this.state.realtime) // POR QUE NO CAMBIA EL VALOR DE REALTIME
          this.setState({ realtime: !this.state.realtime })
          console.log('2_this.props.realtime-> ', this.state.realtime) // <- AQUI ??
          this.props.printRouteTrail(this.state.realtime)
        }}>Realtime</button>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    routes: state.routes.data,
    trails: state.trails,
    activeKey: state.activeKey,
    realtime: state.realtime
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRoutes() {
      dispatch(fetchRoutes());
    },
    printRoute(route) {
      dispatch({ type: "PRINT_ROUTE_TRAIL", payload: '' })
      dispatch(printRoute(route));
    },
    printRouteTrail(realtime) {
      if (realtime) dispatch(printRouteTrail());
      else dispatch({ type: "PRINT_ROUTE_TRAIL", payload: '' })
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);