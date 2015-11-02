'use strict';

import React, {
  Navigator,
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ProfileStats from '../containers/ProfileStats';
import { renderSceneIOS } from '../index';

const NavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    return null;
  },

  RightButton: function(route, navigator, index, navState) {
    return null;
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.navTitle || route.title}
      </Text>
    );
  },
};

export default StatsScreen = React.createClass({
  getNavigator: function() {
    return this.refs.navRef;
  },

  render: function() {
    return (
      <Navigator
        initialRoute={{
          title: 'Profile Stats',
          navTitle: 'Me',
          component: ProfileStats,
          props: this.props
        }}
        ref="navRef"
        style={styles.container}
        renderScene={(route, navigator) => {
          const Component = route.component;
          return (
            <View style={styles.scene}>
              <Component
                navigator={navigator}
                userId={this.props.userId} />
            </View>
          );
        }}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
          />
        } />
    );
  }
});

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    paddingTop: 50
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  navBar: {
    backgroundColor: '#D32F2F',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: '#FFFFFF',
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
    color: '#FFFFFF',
  },
});
