import React, {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Relay from 'react-relay';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import ContributeScreen from '../screens/ContributeScreen';
import ArchivesScreen from '../screens/ArchivesScreen';
import StatsScreen from '../screens/StatsScreen';

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


class App extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired,
  }

  render() {
    const { viewer } = this.props;
    return (
      <View style={styles.container}>
        <ScrollableTabView
          tabBarPosition="bottom"
          >
          <ScrollView style={styles.tabView} tabLabel="Contribute">
            <ContributeScreen contributor={viewer.contributor} viewer={viewer} />
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

export default Relay.createContainer(App, {
  initialVariables: {
    contributorId: 'Q29udHJpYnV0b3I6MQ==',
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Query {
        contributor(id: $contributorId) {
          id
          ${ContributeScreen.getFragment('contributor')}
        }
        ${ContributeScreen.getFragment('viewer')}
      }
    `,
  },
});
