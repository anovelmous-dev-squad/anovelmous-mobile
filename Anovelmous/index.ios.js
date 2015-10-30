'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  Navigator,
  NavigatorIOS,
  View,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

import cssVar from 'cssVar';

import ContributeScreen from './screens/ContributeScreen';
import ArchivesScreen from './screens/ArchivesScreen';
import StatsScreen from './screens/StatsScreen';

const NavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    const previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {"< " + previousRoute.title}
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    return null;
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  },

};

const Main = React.createClass({
  getInitialState: function() {
    return { state: this.props.activeTab }
  },

  componentDidMount: function() {
    this.refs.contributeTabRef.setState({hasBeenSelected: true})
  },

  onTabPress: function(tabTitle) {
    if (this.state.selectedTab !== tabTitle) {
      this.setState({
        selectedTab: tabTitle
      });
    } else if (this.state.selectedTab === tabTitle) {
      this.refs[tabTitle + 'Ref'].popToTop();
    }
  },

  renderContributeScreen: function() {
    return (
      <Navigator
        sceneStyle={styles.scene}
        ref="contributeRef"
        initialRoute={{
          title: 'Contribute',
          component: ContributeScreen,
          props: { userId: this.props.userId }
        }}
        renderScene={renderScene} />
    );
  },

  renderArchivesScreen: function() {
    return (
      <Navigator
        sceneStyle={styles.scene}
        ref="archivesRef"
        initialRoute={{
          title: 'Archives',
          component: ArchivesScreen,
          props: { userId: this.props.userId }
        }}
        renderScene={renderScene} />
    );
  },

  renderStatsScreen: function() {
    return (
      <Navigator
        sceneStyle={styles.scene}
        ref="statsRef"
        initialRoute={{
          title: 'Stats',
          component: StatsScreen,
          props: { userId: this.props.userId }
        }}
        renderScene={renderScene} />
    );
  },

  render: function() {
    return (
      <TabBarIOS>
  	    <TabBarIOS.Item
  	      selected={this.state.selectedTab === 'contribute'}
          ref="contributeTabRef"
  	      systemIcon="favorites"
  	      onPress={() => {this.onTabPress('contribute')}}>
          {this.renderContributeScreen()}

  	    </TabBarIOS.Item>

  	    <TabBarIOS.Item
  	      selected={this.state.selectedTab === 'archives'}
  	      systemIcon="bookmarks"
  	      onPress={() => {this.onTabPress('archives')}}>
          {this.renderArchivesScreen()}
  	    </TabBarIOS.Item>

  	    <TabBarIOS.Item
  	      selected={this.state.selectedTab === 'stats'}
  	      systemIcon="most-viewed"
  	      onPress={() => {this.onTabPress('stats')}}>
          {this.renderStatsScreen()}
  	    </TabBarIOS.Item>

  	  </TabBarIOS>
    );
  }
})

const Anovelmous = React.createClass({
	render: function() {
  	return (
      <Navigator
        ref={(navigator) => { this.navigator = navigator; }}
        renderScene={renderScene}
        initialRoute={{
          title: 'ReelTalk',
          component: Main,
          props: {
            activeTab: 'contribute'
          }
        }}
      />
  	 );
	}
});

const renderScene = (route, navigator) => {
  const Component = route.component;
  return (
    <View style={styles.container}>
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
  },
  navBarTitleText: {
    color: cssVar('fbui-bluegray-60'),
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
    color: cssVar('fbui-accent-blue'),
  },
});

AppRegistry.registerComponent('Anovelmous', () => Anovelmous);
