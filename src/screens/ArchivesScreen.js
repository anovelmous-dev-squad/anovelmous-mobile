import React, {
  Navigator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Library from '../containers/Library';

import ViewerQueryConfig from '../queryConfigs/ViewerQueryConfig';
import { relayRenderScene } from '../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFD',
  },
  navBar: {
    backgroundColor: 'white',
  },
  navBarText: {
    fontSize: 16,
    marginRight: 10,
  },
  navBarTitleText: {
    color: 'black',
    fontWeight: '500',
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarButtonText: {
    color: 'black',
  },
});

const getNavigationBarRouteMapper = () => ({
  LeftButton: (route, navigator, index) => {
    if (index === 0) {
      return null;
    }

    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text>Back</Text>
      </TouchableOpacity>
    );
  },

  RightButton: () => null,

  Title: (route) => {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  },
});

export default class ArchivesScreen extends React.Component {
  render() {
    return (
      <Navigator
        sceneStyle={{flex: 1, marginTop: 65}}
        initialRoute={{
          title: 'Library',
          Component: Library,
          queryConfig: new ViewerQueryConfig(),
          index: 0,
        }}
        navigationBar={<Navigator.NavigationBar routeMapper={getNavigationBarRouteMapper()}/>}
        renderScene={relayRenderScene}
        />
    );
  }
}
