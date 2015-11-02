'use strict';

import React, {
  Navigator,
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Contribute from '../containers/Contribute';

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

export default ContributeScreen = React.createClass({
  getNavigator: function() {
    return this.refs.navRef;
  },

  render: function() {
    return (
      <Navigator
        initialRoute={{
          title: 'Contribute',
          navTitle: 'Live Novel',
          component: Contribute,
          props: this.props
        }}
        ref="navRef"
        style={styles.container}
        renderScene={(route, navigator) => {
          const Component = route.component;
          return (
            <View style={styles.container}>
              <Component {...route.props }/>
            </View>
          )
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
