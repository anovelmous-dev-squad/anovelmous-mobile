'use strict';

import React, {
  AppRegistry,
  BackAndroid,
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

import Drawer from 'react-native-drawer';

import ContributeScreen from './screens/ContributeScreen';
import ArchivesScreen from './screens/ArchivesScreen';
import StatsScreen from './screens/StatsScreen';

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});

const AppText = React.createClass({
  render: function() {
    const { children } = this.props;
    return <Text style={{ fontFamily: 'Roboto', color: '#FFFFFF'}}>{children}</Text>;
  }
});

const PrimaryText = React.createClass({
  render: function() {
    const { children } = this.props;
    return <Text style={{ fontFamily: 'Roboto', color: '#212121'}}>{children}</Text>;
  }
});

const SecondaryText = React.createClass({
  render: function() {
    const { children } = this.props;
    return <Text style={{ fontFamily: 'Roboto', color: '#727272'}}>{children}</Text>
  }
});

const ControlPanel = React.createClass({
  render: function() {
    return (
      <View>
        <TouchableOpacity onPress={() => {
            this.props.navigator.push({
              title: 'Contribute',
              component: ContributeScreen,
              props: this.props
            });
          }}>
          <AppText>Contribute</AppText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
            this.props.navigator.push({
              title: 'Archives',
              component: ArchivesScreen,
              props: this.props
            });
          }}>
          <AppText>Archives</AppText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
            this.props.navigator.push({
              title: 'Stats',
              component: StatsScreen,
              props: this.props
            });
          }}>
          <AppText>Statistics</AppText>
        </TouchableOpacity>
      </View>
    );
  }
});

const Anovelmous = React.createClass({
  getInitialState: function() {
    return { userId: '1' };
  },

  render: function() {
    return (
      <Navigator
        style={styles.container}
        ref={(navigator) => { this.navigator = navigator; }}
        renderScene={renderScene}
        initialRoute={{
          title: 'Anovelmous',
          component: ContributeScreen,
          props: {
            userId: this.state.userId
          }
        }}
      />
    );
  }
});

const renderScene = (route, navigator) => {
  _navigator = navigator;
  const Component = route.component;
  return (
    <Drawer
      type="overlay"
      ref="drawer"
      openDrawerOffset={100}
      styles={{
        drawer: {
          backgroundColor: '#9E9E9E',
          shadowColor: "#000000",
          shadowOpacity: 0.8,
          shadowRadius: 0,
        }
      }}
      tweenHandler={(ratio) => {
        const drawerShadow = ratio < .2 ? ratio*5*5 : 5
        return {
          drawer: {
            shadowRadius: drawerShadow,
          },
          main: {
            opacity:(2-ratio)/2,
          },
        }
      }}
      content={<ControlPanel navigator={navigator} />}>
      <View style={styles.scene}>
        <Component
          route={route}
          navigator={navigator}
          topNavigator={navigator}
          {...route.props} />
      </View>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    flex: 1
  },
  scene: {
    flex: 1
  },
});

AppRegistry.registerComponent('Anovelmous', () => Anovelmous);
