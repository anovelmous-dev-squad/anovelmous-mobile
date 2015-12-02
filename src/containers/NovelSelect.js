import React, {
  View,
  Text,
} from 'react-native';
import Relay from 'react-relay';

class NovelSelect extends React.Component {
  static propTypes = {
    currentNovel: React.PropTypes.object.isRequired,
    novels: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
  }

  render() {
    return (
      <View>
        <Text>ahh</Text>
      </View>
    );
  }
}

export default Relay.createContainer(NovelSelect, {
  fragments: {
    currentNovel: () => Relay.QL`
      fragment on Novel {
        id
      }
    `,
    novels: () => Relay.QL`
      fragment on NovelConnection {
        edges {
          node {
            id
            title
          }
        }
      }
    `,
  },
});
