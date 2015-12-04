import React, { AppRegistry } from 'react-native';
import Relay from 'react-relay';
import ViewerQueryConfig from './src/queryConfigs/ViewerQueryConfig';
import config from './config';

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer(config.hardwareGraphqlURL)
);

import App from './src/containers/App';
import AppTabBar from './src/components/AppTabBar';

class Anovelmous extends React.Component {
  render() {
    const viewerQueryConfig = new ViewerQueryConfig();
    return (
      <Relay.RootContainer
         Component={App}
         route={viewerQueryConfig}
         renderFetched={(data) => (
           <App
             style={{marginTop: 0}}
             tabBar={() => <AppTabBar textStyle={{color: 'white'}} tabsStyle={{height: 40}} />}
             {...data}
             />
         )}
      />
    );
  }
}

AppRegistry.registerComponent('Anovelmous', () => Anovelmous);
