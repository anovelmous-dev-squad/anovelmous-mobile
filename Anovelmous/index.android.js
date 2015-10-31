'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  Navigator,
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

import { renderScene } from './utils';

const Main = React.createClass({
  getInitialState: function() {
    const routes = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      routes: routes.cloneWithRows([
        { title: 'Contribute', component: ContributeScreen },
        { title: 'Archives', component: ArchivesScreen },
        { title: 'Stats', component: StatsScreen }
      ]),
    };
  },
  _onActionSelected: function(position) {
  },
  renderNavigationView: function(navigator) {
    return (
      <ListView style={{flex: 1, backgroundColor: '#fff'}}
        dataSource={this.state.routes}
        renderRow={(route) => (
          <TouchableOpacity onPress={() => navigator.push(route)}>
            <Text>{route.title}</Text>
          </TouchableOpacity>
        )} />
    )
  },
  render: function() {
    return (
      <Drawer
        type="overlay"
        ref="navDrawer"
        openDrawerOffset={50}
        panCloseMask={1}
        styles={styles.navDrawer}
        tweenHandler={(ratio) => {
          return {
            drawer: { shadowRadius: Math.min(ratio*5*5, 5) },
            main: { opacity: (2-ratio)/2 }
          }
        }}
        content={this.renderNavigationView(this.props.navigator)}>
        <ToolbarAndroid
          style={{height: 60, backgroundColor: '#D32F2F'}}
          navIcon={require('image!menu_icon')}
          onIconClicked={() => this.refs.navDrawer.open()}
          logo={require('image!toolbar_logo')}
          title="Anovelmous"
          titleColor="#FFFFFF"
          actions={[]}
          onActionSelected={this._onActionSelected}/>
      </Drawer>
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
        ref={(navigator) => { this.navigator = navigator; }}
        renderScene={renderScene}
        initialRoute={{
          title: 'Anovelmous',
          component: Main,
          props: {
            userId: this.state.userId
          }
        }}
      />
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
  navDrawer: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 0,
  },
});

AppRegistry.registerComponent('Anovelmous', () => Anovelmous);
