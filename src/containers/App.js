import React, {
  Dimensions,
  Navigator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Relay from 'react-relay';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import ContributeScreen from '../screens/ContributeScreen';
import ArchivesScreen from '../screens/ArchivesScreen';
import StatsScreen from '../screens/StatsScreen';
import AppTabBar from '../components/AppTabBar';

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
    style: React.PropTypes.object,
    viewer: React.PropTypes.object.isRequired,
  }

  render() {
    const { viewer, style } = this.props;
    return (
      <View style={[styles.container, style]}>
        <ScrollableTabView
          renderTabBar={() => <AppTabBar />}
          tabBarPosition="bottom"
          >
          <ContributeScreen tabLabel="✍" contributor={viewer.contributor} viewer={viewer} />
          <ArchivesScreen tabLabel="📚" />
          <StatsScreen tabLabel="📈" contributor={viewer.contributor} />
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
          ${StatsScreen.getFragment('contributor')}
        }
        ${ContributeScreen.getFragment('viewer')}
      }
    `,
  },
});
