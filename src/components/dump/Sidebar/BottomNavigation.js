import React from 'react';

import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui-icons/Restore';
import NearMeIcon from 'material-ui-icons/NearMe';
import LocationOnIcon from 'material-ui-icons/LocationOn';

const actions = {
  recent: {
    label: "Recent",
    icon: NearMeIcon,
  },
  geoFences: {
    label: "Geo-fences",
    icon: LocationOnIcon,
  },
  nearby: {
    label: "Nearby",
    icon: RestoreIcon,
  },
};

const SidebarBottomNavigation = ({ onChange, selectedTab, rootStyle, iconColors }) => (
  <BottomNavigation onChange={onChange} value={selectedTab} style={rootStyle}>
    {Object.keys(actions).map(action => {
      const Icon = actions[action].icon;
      const iconColor = selectedTab === action ? iconColors.selected : iconColors.default;
      return <BottomNavigationAction
        key={action}
        label={actions[action].label}
        value={action}
        icon={<Icon style={{ color: iconColor }} />}
      />;
    })}
  </BottomNavigation>
);

export default SidebarBottomNavigation;