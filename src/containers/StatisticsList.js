import React, {
  Text,
  View,
} from 'react-native';
import Relay from 'react-relay';


class StatisticsList extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Text>Stats</Text>
      </View>
    );
  }
}

export default Relay.createContainer(StatisticsList, {
  fragments: {
    contributor: () => Relay.QL`
      fragment on Contributor {
        votes(first: 10) {
          edges {
            node {
              id
            }
          }
        }
      }
    `,
    viewer: () => Relay.QL`
      fragment on Query {
        votes(first: 10) {
          edges {
            node {
              id
            }
          }
        }
      }
    `,
  },
});
