import React, { Component } from 'react';
import { PanelGroup, Panel } from 'react-bootstrap';
import { fetchRoutes, printRoute, printRouteTrail } from '../actionCreators';
import { connect } from 'react-redux';
import fB from '../firebase-client';

const state = {}

class Sidebar extends Component {
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
      <div className="sidebar">
        <PanelGroup
          accordion
          id="accordion-example"
          activeKey={this.state.activeKey}
          onSelect={this.handleSelect}
        >
          {this.props.routes && Object.keys(this.props.routes).map((route_id) => (
            <Panel eventKey={route_id} key={route_id}>
              <Panel.Heading>
                <Panel.Title
                  toggle
                  onClick={() => this.props.printRoute(this.props.routes[route_id])}
                >{this.props.routes[route_id].title}</Panel.Title>
              </Panel.Heading>
            </Panel>
          ))}
        </PanelGroup>
        <div>
          <button onClick={() => {            
            console.log('1_this.state.realtime-> ', this.state.realtime) // POR QUE NO CAMBIA EL VALOR DE REALTIME
            this.setState({ realtime: !this.state.realtime })
            console.log('2_this.state.realtime-> ', this.state.realtime) // <- AQUI ??
            this.props.printRouteTrail(this.state.realtime)
          }
          }>Realtime</button>
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    routes: state.routes.data,
    trails: state.trails
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


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);