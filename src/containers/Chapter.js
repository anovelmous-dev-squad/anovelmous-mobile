import React, {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Relay from 'react-relay';

import AutoComplete from '../components/AutoComplete';

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

  constructor(props) {
    super(props);
    const { chapter, vocabulary, places, characters, plotItems } = props;
    const dataSource = {};
    vocabulary.edges.forEach(edge => (
      dataSource[edge.node.content] = this._getAutoCompleteItem(edge.node.id, edge.node.content)
    ));
    places.edges.forEach(edge => (
      dataSource[edge.node.name] = this._getAutoCompleteItem(edge.node.id, edge.node.name)
    ));
    characters.edges.forEach(edge => (
      dataSource[edge.node.firstName] = this._getAutoCompleteItem(edge.node.id, edge.node.firstName)
    ));
    plotItems.edges.forEach(edge => (
      dataSource[edge.node.name] = this._getAutoCompleteItem(edge.node.id, edge.node.name)
    ));
    this.state = {
      fullVocabulary: dataSource,
    };
  }

  _getAutoCompleteItem(key, value) {
    return { text: value, value: <Text>{value}</Text> };
  }

  _autoCompleteFilter(searchText, key) {
    if (searchText.length > 1) {
      return key.startsWith(searchText);
    }
    if (searchText === key) {
      return true;
    }
    return false;
  }

  render() {
    const { chapter, onVoteChange, voteText } = this.props;
    return (
      <ScrollView>
        <Text>{chapter.text.slice(0, 1500)}</Text>
        {!chapter.isCompleted &&
          <AutoComplete
            open
            dataSource={this.state.fullVocabulary}
            searchText={voteText}
            onUpdateInput={(text) => onVoteChange(text)}
            filter={this._autoCompleteFilter}
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
