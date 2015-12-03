import React, {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Relay from 'react-relay';


class Chapter extends React.Component {
  static propTypes = {
    chapter: React.PropTypes.object.isRequired,
    vocabulary: React.PropTypes.object.isRequired,
    places: React.PropTypes.object.isRequired,
    characters: React.PropTypes.object.isRequired,
    plotItems: React.PropTypes.object.isRequired,
    readingHeight: React.PropTypes.number,
    onVoteChange: React.PropTypes.func,
    onVoteCast: React.PropTypes.func,
    voteText: React.PropTypes.string,
    children: React.PropTypes.element,
  }

  render() {
    const { chapter, voteText } = this.props;
    return (
      <ScrollView>
        <Text style={{color: 'black'}}>{chapter.text.slice(0, 500)}</Text>
        {!chapter.isCompleted &&
          <TextInput
            style={{height: 40}}
            onChangeText={() => {}}
            />
        }
      </ScrollView>
    );
  }
}

export default Relay.createContainer(Chapter, {
  fragments: {
    chapter: () => Relay.QL`
      fragment on Chapter {
        id
        isCompleted
        votingDuration
        novel {
          prevVotingEnded
        }
        text
      }
    `,
    vocabulary: () => Relay.QL`
      fragment on VocabTermConnection {
        edges {
          node {
            id
            content
          }
        }
      }
    `,
    places: () => Relay.QL`
      fragment on PlaceConnection {
        edges {
          node {
            id
            name
          }
        }
      }
    `,
    characters: () => Relay.QL`
      fragment on CharacterConnection {
        edges {
          node {
            id
            firstName
          }
        }
      }
    `,
    plotItems: () => Relay.QL`
      fragment on PlotItemConnection {
        edges {
          node {
            id
            name
          }
        }
      }
    `,
  },
});
