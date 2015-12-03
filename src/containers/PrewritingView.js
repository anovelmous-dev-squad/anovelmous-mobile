import React, {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Relay from 'react-relay';

class PrewritingView extends React.Component {
  static propTypes = {
    contributor: React.PropTypes.object.isRequired,
    novel: React.PropTypes.object.isRequired,
  }

  render() {
    return (
      <View>
        <Text>{`welcome, ${this.props.contributor.id}!`}</Text>
      </View>
    );
  }
}

export default Relay.createContainer(PrewritingView, {
  fragments: {
    contributor: () => Relay.QL`
      fragment on Contributor {
        id
      }
    `,
    novel: () => Relay.QL`
      fragment on Novel {
        title
        stage {
          name
        }
      }
    `,
  },
});
