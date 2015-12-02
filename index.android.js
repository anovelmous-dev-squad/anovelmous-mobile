import React, {
  AppRegistry,
  Dimensions,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import ContributeScreen from './src/screens/ContributeScreen';
import ArchivesScreen from './src/screens/ArchivesScreen';
import StatsScreen from './src/screens/StatsScreen';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  tabView: {
    width: deviceWidth,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          tabBarPosition="bottom"
          >
          <ScrollView style={styles.tabView} tabLabel="Contribute">
            <ContributeScreen />
          </ScrollView>
          <ScrollView style={styles.tabView} tabLabel="Archives">
            <ArchivesScreen />
          </ScrollView>
          <ScrollView style={styles.tabView} tabLabel="Stats">
            <StatsScreen />
          </ScrollView>
        </ScrollableTabView>
      </View>
    );
  }
}


AppRegistry.registerComponent('Anovelmous', () => App);
