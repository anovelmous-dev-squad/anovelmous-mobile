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

import ContributeScreen from './screens/ContributeScreen';
import ArchivesScreen from './screens/ArchivesScreen';
import StatsScreen from './screens/StatsScreen';

import { AppText } from './components/text';

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
        <AppText>
          {"< " + previousRoute.title}
        </AppText>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    return null;
  },

  Title: function(route, navigator, index, navState) {
    return (
      <AppText>
        {route.title}
      </AppText>
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
      this.refs[tabTitle + 'Ref'].getNavigator().popToTop();
    }
  },

  render: function() {
    return (
      <TabBarIOS>
  	    <TabBarIOS.Item
  	      selected={this.state.selectedTab === 'contribute'}
          ref="contributeTabRef"
  	      systemIcon="favorites"
  	      onPress={() => {this.onTabPress('contribute')}}>
          <ContributeScreen {...this.props} ref="contributeRef" />

  	    </TabBarIOS.Item>

  	    <TabBarIOS.Item
  	      selected={this.state.selectedTab === 'archives'}
  	      systemIcon="bookmarks"
  	      onPress={() => {this.onTabPress('archives')}}>
          <ArchivesScreen {...this.props} ref="archivesRef" />
  	    </TabBarIOS.Item>

  	    <TabBarIOS.Item
  	      selected={this.state.selectedTab === 'stats'}
  	      systemIcon="most-viewed"
  	      onPress={() => {this.onTabPress('stats')}}>
          <StatsScreen {...this.props} ref="statsRef" />
  	    </TabBarIOS.Item>

  	  </TabBarIOS>
    );
  }
});

const Anovelmous = React.createClass({
	render: function() {
  	return (
      <Navigator
        ref={(navigator) => { this.navigator = navigator; }}
        renderScene={(route, navigator) => {
          const Component = route.component;
          return (
            <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
              <Component
                route={route}
                navigator={navigator}
                topNavigator={navigator}
                {...route.props} />
            </View>
          );
        }}
        initialRoute={{
          title: 'Anovelmous',
          component: Main,
          props: {
            activeTab: 'contribute',
            navigator: this
          }
        }}
      />
  	 );
	}
});

AppRegistry.registerComponent('Anovelmous', () => Anovelmous);
