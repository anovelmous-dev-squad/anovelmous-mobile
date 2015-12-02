import React, {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Relay from 'react-relay';

import Chapter from './Chapter';

import ScrollableTabView from 'react-native-scrollable-tab-view';

class Novel extends React.Component {
  static propTypes = {
    novel: React.PropTypes.object.isRequired,
    vocabulary: React.PropTypes.object.isRequired,
    places: React.PropTypes.object.isRequired,
    characters: React.PropTypes.object.isRequired,
    plotItems: React.PropTypes.object.isRequired,
    voteText: React.PropTypes.string.isRequired,
  }

  renderChapter(chapter) {
    const { vocabulary, places, characters, plotItems, voteText } = this.props;
    return (
      <ScrollView tabLabel={chapter.title}>
        <Chapter
          chapter={chapter}
          vocabulary={vocabulary}
          places={places}
          characters={characters}
          plotItems={plotItems}
          voteText={voteText}
          />
      </ScrollView>
    );
  }

  render() {
    const { novel } = this.props;
    return (
      <ScrollableTabView>
        {novel.chapters.edges.map(edge => this.renderChapter(edge.node))}
      </ScrollableTabView>
    );
  }
}

export default Relay.createContainer(Novel, {
  fragments: {
    novel: () => Relay.QL`
      fragment on Novel {
        id
        title
        latestChapter {
          id
        }
        chapters(last: 4) {
          edges {
            node {
              id
              title
              ${Chapter.getFragment('chapter')}
            }
          }
        }
      }
    `,
    vocabulary: () => Relay.QL`
      fragment on VocabTermConnection {
        ${Chapter.getFragment('vocabulary')}
      }
    `,
    places: () => Relay.QL`
      fragment on PlaceConnection {
        ${Chapter.getFragment('places')}
      }
    `,
    characters: () => Relay.QL`
      fragment on CharacterConnection {
        ${Chapter.getFragment('characters')}
      }
    `,
    plotItems: () => Relay.QL`
      fragment on PlotItemConnection {
        ${Chapter.getFragment('plotItems')}
      }
    `,
  },
});
