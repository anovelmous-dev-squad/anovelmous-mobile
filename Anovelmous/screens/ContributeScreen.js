'use strict';

import React, {
  Navigator,
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { MKButton, MKColor } from 'react-native-material-kit'

import Chapter from '../containers/Chapter';

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

const getButton = () => {
  return (
    <MKButton
      backgroundColor={MKColor.Teal}
      shadowRadius={2}
      shadowOffset={{width:0, height:2}}
      shadowOpacity={.7}
      shadowColor="black"
      onPress={() => {
        console.log('totally a material button!');
      }}
      >
      <Text pointerEvents="none"
            style={{color: 'white', fontWeight: 'bold',}}>
        Contribute
      </Text>
    </MKButton>
  );
};

export default ContributeScreen = React.createClass({
  getNavigator: function() {
    return this.refs.navRef;
  },

  render: function() {
    return (
      <Navigator
        initialRoute={{
          title: 'Chapter',
          navTitle: 'Chapter 2',
          component: Chapter,
          props: this.props
        }}
        ref="navRef"
        renderScene={(route, navigator) => {
          return (
            <View style={{paddingTop: 65, flex: 1}}>
              {getButton()}
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
