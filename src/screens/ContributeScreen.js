import React, {
  Dimensions,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Relay from 'react-relay';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  base: {
    color: 'black',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 620,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  tabView: {
    width: deviceWidth,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
});

import Notebook from '../containers/Notebook';
import PrewritingView from '../containers/PrewritingView';

class ContributeScreen extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired,
  }

  constructor() {
    super();
    this.state = { voteText: '', prevVoteText: '' };
  }

  _handleNovelChange = (novelId) => {
    console.log(novelId);
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
    const { viewer } = this.props;
    return (
      <ScrollView style={styles.tabView}>
      <View style={styles.card}>
        <Notebook
          novel={viewer.novel}
          novels={viewer.novels}
          vocabulary={viewer.vocabulary}
          places={viewer.places}
          plotItems={viewer.plotItems}
          onNovelChange={this._handleNovelChange}
          onChapterChange={this._handleChapterChange}
          onVoteChange={this._handleVoteChange}
          onVoteCast={this._handleVoteCast}
          voteText={this.state.voteText}
          />
      </View>
    </ScrollView>
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
        ${PrewritingView.getFragment('contributor')}
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
          vocabulary(first: 200) {
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
          ${PrewritingView.getFragment('novel')}
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
