import React, {
  Navigator,
  StyleSheet,
  Text,
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
  scene: {
    paddingTop: 65,
    flex: 1,
  },
  navBar: {
    backgroundColor: 'white',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
    marginRight: 10,
  },
  navBarTitleText: {
    color: 'black',
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
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
