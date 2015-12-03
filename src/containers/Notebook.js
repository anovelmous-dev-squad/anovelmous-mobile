import React, {
  StyleSheet,
  TextInput,
  Text,
  View,
} from 'react-native';
import Relay from 'react-relay';

import NovelSelect from './NovelSelect';
import Novel from './Novel';

class Notebook extends React.Component {
  static propTypes = {
    novel: React.PropTypes.object.isRequired,
    novels: React.PropTypes.object.isRequired,
    vocabulary: React.PropTypes.object.isRequired,
    places: React.PropTypes.object.isRequired,
    characters: React.PropTypes.object.isRequired,
    plotItems: React.PropTypes.object.isRequired,
    voteText: React.PropTypes.string.isRequired,
  }

  render() {
    const { novel, novels, vocabulary, places, characters, plotItems, voteText } = this.props;
    return (
      <View>
        <NovelSelect
          currentNovel={novel}
          novels={novels}
          onChange={() => {}}
          />
        <Novel
          novel={novel}
          novels={novels}
          vocabulary={vocabulary}
          places={places}
          characters={characters}
          plotItems={plotItems}
          voteText={voteText}
          />
      </View>
    );
  }
}

export default Relay.createContainer(Notebook, {
  fragments: {
    novel: () => Relay.QL`
      fragment on Novel {
        id
        latestChapter {
          id
        }
        stage {
          name
        }
        ${NovelSelect.getFragment('currentNovel')}
        ${Novel.getFragment('novel')}
      }
    `,
    novels: () => Relay.QL`
      fragment on NovelConnection {
        ${NovelSelect.getFragment('novels')}
      }
    `,
    vocabulary: () => Relay.QL`
      fragment on VocabTermConnection {
        ${Novel.getFragment('vocabulary')}
      }
    `,
    places: () => Relay.QL`
      fragment on PlaceConnection {
        ${Novel.getFragment('places')}
      }
    `,
    characters: () => Relay.QL`
      fragment on CharacterConnection {
        ${Novel.getFragment('characters')}
      }
    `,
    plotItems: () => Relay.QL`
      fragment on PlotItemConnection {
        ${Novel.getFragment('plotItems')}
      }
    `,
  },
});
