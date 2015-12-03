import React, {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Relay from 'react-relay';

import Chapter from './Chapter';
import ChapterTabBar from '../components/ChapterTabBar';

import ScrollableTabView from 'react-native-scrollable-tab-view';

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 480,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    width: 350,
  },
});

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
        <View style={styles.card}>
          <Chapter
            chapter={chapter}
            vocabulary={vocabulary}
            places={places}
            characters={characters}
            plotItems={plotItems}
            voteText={voteText}
            />
        </View>
      </ScrollView>
    );
  }

  render() {
    const { novel } = this.props;
    return (
      <ScrollableTabView
        renderTabBar={() => <ChapterTabBar widthOffset={45} />}
        locked>
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
