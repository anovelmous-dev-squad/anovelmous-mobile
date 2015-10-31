'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  Navigator,
  PixelRatio,
  ListView,
  Text,
  ToolbarAndroid,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import cssVar from 'cssVar';
import Drawer from 'react-native-drawer';

import LandingScreen from './screens/LandingScreen';

const Anovelmous = React.createClass({
  getInitialState: function() {
    return { userId: '1' };
  },

  componentWillMount: function() {
    this._navBarRouteMapper = {
      rightContentForRoute: function(route, navigator) {
        return null;
      },
      titleContentForRoute: function(route, navigator) {
        return (
          <TouchableOpacity
            onPress={() => {}}>
            <Text style={styles.titleText}>{route.title}</Text>
          </TouchableOpacity>
        );
      },
      iconForRoute: function(route, navigator) {
        return (
          <TouchableOpacity
            onPress={() => { navigator.popToRoute(route); }}
            style={styles.crumbIconPlaceholder}
          />
        );
      },
      separatorForRoute: function(route, navigator) {
        return (
          <TouchableOpacity
            onPress={navigator.pop}
            style={styles.crumbSeparatorPlaceholder}
          />
        );
      }
    };
  },

  render: function() {
    return (
      <Navigator
        style={styles.container}
        ref={(navigator) => { this.navigator = navigator; }}
        renderScene={renderScene}
        navigationBar={
        <Navigator.BreadcrumbNavigationBar
            style={styles.navBar}
            routeMapper={this._navBarRouteMapper}
          />
        }
        initialRoute={{
          title: 'Anovelmous',
          component: LandingScreen,
          props: {
            userId: this.state.userId
          }
        }}
      />
    );
  }
});

export const renderScene = (route, navigator) => {
  const Component = route.component;
  return (
    <View style={styles.scene}>
      <Component
        route={route}
        navigator={navigator}
        topNavigator={navigator}
        {...route.props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    flex: 1
  },
  scene: {
    paddingTop: 50,
    flex: 1
  },
  navBar: {
    backgroundColor: '#D32F2F',
    flex: 1
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
  titleText: {
    marginTop: 15,
    marginLeft: 10,
    fontSize: 18,
    color: '#FFFFFF',
    alignSelf: 'center',
    fontWeight: 'bold',
    lineHeight: 32,
  },
  crumbIconPlaceholder: {
    flex: 1,
    backgroundColor: '#666666',
  },
  crumbSeparatorPlaceholder: {
    flex: 1,
    backgroundColor: '#aaaaaa',
  }
});

AppRegistry.registerComponent('Anovelmous', () => Anovelmous);
