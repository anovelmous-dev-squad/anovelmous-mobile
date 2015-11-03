'use strict';

import React, {
  Navigator,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Library from '../containers/Library';

export default ArchivesScreen = React.createClass({
  componentWillMount: function() {
    this._navBarRouteMapper = {
      rightContentForRoute: function(route, navigator) {
        return null;
      },
      titleContentForRoute: function(route, navigator) {
        return (
          <TouchableOpacity
            onPress={() => {}}>
            <Text style={styles.titleText}>{route.navTitle || route.title}</Text>
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

  getNavigator: function() {
    return this.refs.navRef;
  },

  render: function() {
    return (
      <Navigator
        initialRoute={{
          title: 'Library',
          component: Library,
          props: this.props
        }}
        ref="navRef"
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
          <Navigator.BreadcrumbNavigationBar
            style={styles.navBar}
            routeMapper={this._navBarRouteMapper}
          />
        } />
    );
  }
});

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    paddingTop: 65
  },
  navBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D32F2F',
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
