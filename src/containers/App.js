import React, {
  StyleSheet,
  View,
} from 'react-native';
import Relay from 'react-relay';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import ContributeScreen from '../screens/ContributeScreen';
import ArchivesScreen from '../screens/ArchivesScreen';
import StatsScreen from '../screens/StatsScreen';
import AppTabBar from '../components/AppTabBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#B71C1C',
  },
});

class App extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    tabBar: React.PropTypes.element,
    viewer: React.PropTypes.object.isRequired,
  }

  render() {
    const { viewer, style, tabBar } = this.props;
    return (
      <View style={[styles.container, style]}>
        <ScrollableTabView
          renderTabBar={tabBar || () => <AppTabBar textStyle={{color: 'white'}}/>}
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
