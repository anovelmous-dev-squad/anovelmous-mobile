import React, {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Relay from 'react-relay';

import Chapter from './Chapter';
import AppTabBar from '../components/AppTabBar';

import ScrollableTabView from 'react-native-scrollable-tab-view';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  card: {
    height: deviceHeight * (2 / 3),
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    marginTop: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});

class Novel extends React.Component {
  static propTypes = {
    width: React.PropTypes.object.isRequired,
    novel: React.PropTypes.object.isRequired,
    vocabulary: React.PropTypes.object.isRequired,
    places: React.PropTypes.object.isRequired,
    characters: React.PropTypes.object.isRequired,
    plotItems: React.PropTypes.object.isRequired,
    onVoteChange: React.PropTypes.func.isRequired,
    onVoteCast: React.PropTypes.func.isRequired,
    voteText: React.PropTypes.string.isRequired,
  }

  renderChapter(chapter) {
    const { vocabulary, places, characters, plotItems,
            onVoteChange, onVoteCast, voteText } = this.props;
    return (
      <View tabLabel={chapter.title} style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{width: 376}}>
          <View style={styles.container}>
            <ScrollView style={styles.card}>
              <Chapter
                chapter={chapter}
                vocabulary={vocabulary}
                places={places}
                characters={characters}
                plotItems={plotItems}
                onVoteChange={onVoteChange}
                onVoteCast={onVoteCast}
                voteText={voteText}
                />
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }

  renderTabBar() {
    return (
      <AppTabBar
        widthOffset={45}
        textStyle={{fontSize: 15}}
        tabsStyle={{backgroundColor: '#B71C1C'}}
        />
    );
  }

  render() {
    const { novel } = this.props;
    return (
      <ScrollableTabView
        renderTabBar={this.renderTabBar}
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
