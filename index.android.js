import React, { AppRegistry } from 'react-native';
import Relay from 'react-relay';
import ViewerQueryConfig from './src/queryConfigs/ViewerQueryConfig';
import config from './config';

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer(config.hardwareGraphqlURL)
);

import App from './src/containers/App';

class Anovelmous extends React.Component {
  render() {
    const viewerQueryConfig = new ViewerQueryConfig();
    return (
      <Relay.RootContainer
         Component={App}
         route={viewerQueryConfig}
      />
    );
  }
}

AppRegistry.registerComponent('Anovelmous', () => Anovelmous);
