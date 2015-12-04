import React, {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Relay from 'react-relay';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  base: {
    color: 'black',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  card: {
    width: deviceWidth,
    backgroundColor: '#b3b3b3',
    borderColor: 'rgba(0,0,0,0.1)',
    padding: 15,
  },
});

import Notebook from '../containers/Notebook';

class ContributeScreen extends React.Component {
  static propTypes = {
    relay: React.PropTypes.object.isRequired,
    contributor: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object.isRequired,
  }

  constructor() {
    super();
    this.state = { voteText: '', prevVoteText: '' };
  }

  _handleNovelChange = (novelId) => {
    this.props.relay.setVariables({novelId});
  }

  _handleChapterChange = (chapterId) => {
    console.log(chapterId);
  }

  _handleVoteChange = (voteText) => {
    this.setState({voteText});
  }

  _handleVoteCast = (resourceId, text) => {
    this.setState({voteText: '', prevVoteText: text});
  }

  render() {
    const { viewer, contributor } = this.props;
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.card}>
            <Notebook
              contributor={contributor}
              novel={viewer.novel}
              novels={viewer.novels}
              characters={viewer.novel.characters}
              vocabulary={viewer.novel.vocabulary}
              places={viewer.novel.places}
              plotItems={viewer.novel.plotItems}
              onNovelChange={this._handleNovelChange}
              onChapterChange={this._handleChapterChange}
              onVoteChange={this._handleVoteChange}
              onVoteCast={this._handleVoteCast}
              voteText={this.state.voteText}
              />
          </View>
        </View>
      </View>
    );
  }
}

export default Relay.createContainer(ContributeScreen, {
  initialVariables: {
    novelId: 'Tm92ZWw6Mg==',
  },
  fragments: {
    contributor: () => Relay.QL`
      fragment on Contributor {
        id
        ${Notebook.getFragment('contributor')}
      }
    `,
    viewer: () => Relay.QL`
      fragment on Query {
        novel(id: $novelId) {
          id
          stage {
            name
          }
          latestChapter {
            id
            tokens {
              totalCount
            }
          }
          vocabulary(first: 1000) {
            ${Notebook.getFragment('vocabulary')}
          }
          places(first: 50) {
            ${Notebook.getFragment('places')}
          }
          characters(first: 50) {
            ${Notebook.getFragment('characters')}
          }
          plotItems(first: 50) {
            ${Notebook.getFragment('plotItems')}
          }
          ${Notebook.getFragment('novel')}
        }
        novels(last: 5) {
          edges {
            node {
              id
              stage {
                name
              }
              latestChapter {
                id
              }
            }
          }
          ${Notebook.getFragment('novels')}
        }
      }
    `,
  },
});
