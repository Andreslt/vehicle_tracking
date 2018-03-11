import React, { Component } from 'react';
import { PanelGroup, Panel } from 'react-bootstrap';
import { fetchRoutes, printRoute } from '../actionCreators';
import { connect } from 'react-redux';

class Sidebar extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      activeKey: '1'
    };
  }

  componentDidMount(){
    this.props.fetchRoutes()
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
          {this.props.routes.map(route => (            
            <Panel eventKey={route.id} key={route.id}>
            {console.log('route->', route)}
              <Panel.Heading>
                <Panel.Title toggle>{route.zone}</Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible
                onClick={() => this.props.printRoute(route)}
              >{route.title}</Panel.Body>
            </Panel>
          ))}
        </PanelGroup>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    routes: state.routes.data,
    printRoute: state.printRoute
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRoutes() {
      dispatch(fetchRoutes());
    },
    printRoute(route) {
      dispatch(printRoute(route));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);