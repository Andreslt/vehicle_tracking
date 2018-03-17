import React from 'react';
import { PanelGroup, Panel } from 'react-bootstrap';
import { compose, withProps, withStateHandlers } from "recompose";
import './styles.css';

const Sidebar = compose(
  withProps({

  })
)(props => {
  return (
    <div className="sidebar">
      <PanelGroup
        accordion
        id="accordion-example"
        activeKey={props.activeKey}
        onSelect={props.handleSelect}
      >
        {props.routes && Object.keys(props.routes).map((route_id) => (
          <Panel eventKey={route_id} key={route_id}>
            <Panel.Heading>
              <Panel.Title
                toggle
                onClick={() => props.printRoute(props.routes[route_id])}
              >{props.routes[route_id].title}</Panel.Title>
            </Panel.Heading>
          </Panel>
        ))}
      </PanelGroup>
    </div>
  )
})

export default Sidebar 