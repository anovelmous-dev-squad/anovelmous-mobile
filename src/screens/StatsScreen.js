import React, {
  Navigator,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Relay from 'react-relay';

import StatisticsList from '../containers/StatisticsList';
import StatsQueryConfig from '../queryConfigs/StatsQueryConfig';
import { relayRenderScene } from '../utils';

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
    marginRight: 10,
  },
  navBarTitleText: {
    color: 'black',
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
    color: 'black',
  },
});

const getNavigationBarRouteMapper = () => ({
  LeftButton: (route, navigator, index) => {
    if (index === 0) {
      return null;
    }

    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text>Back</Text>
      </TouchableOpacity>
    );
  },

  RightButton: () => null,

  Title: (route) => {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  },
});

class StatsScreen extends React.Component {
  static propTypes = {
    contributor: React.PropTypes.object.isRequired,
  }

  render() {
    return (
      <Navigator
        tabLabel="Stats"
        initialRoute={{
          title: 'Stats',
          Component: StatisticsList,
          queryConfig: new StatsQueryConfig({contributorId: this.props.contributor.id}),
          index: 0 }}
        navigationBar={<Navigator.NavigationBar routeMapper={getNavigationBarRouteMapper()}/>}
        renderScene={relayRenderScene}
        />
    );
  }
}

export default Relay.createContainer(StatsScreen, {
  fragments: {
    contributor: () => Relay.QL`
      fragment on Contributor {
        id
      }
    `,
  },
});
