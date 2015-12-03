import React, {
  StyleSheet,
  TextInput,
  Text,
  View,
} from 'react-native';
import Relay from 'react-relay';

import NovelSelect from './NovelSelect';
import Novel from './Novel';
import PrewritingView from '../containers/PrewritingView';

import { isPrewriting } from '../utils';

class Notebook extends React.Component {
  static propTypes = {
    contributor: React.PropTypes.object.isRequired,
    novel: React.PropTypes.object.isRequired,
    novels: React.PropTypes.object.isRequired,
    vocabulary: React.PropTypes.object.isRequired,
    places: React.PropTypes.object.isRequired,
    characters: React.PropTypes.object.isRequired,
    plotItems: React.PropTypes.object.isRequired,
    onNovelChange: React.PropTypes.func.isRequired,
    onChapterChange: React.PropTypes.func.isRequired,
    onVoteChange: React.PropTypes.func.isRequired,
    onVoteCast: React.PropTypes.func.isRequired,
    voteText: React.PropTypes.string.isRequired,
  }

  render() {
    const { contributor, novel, novels, vocabulary, places, characters, plotItems,
            onNovelChange, onChapterChange, onVoteChange, onVoteCast, voteText } = this.props;
    return (
      <View>
        <NovelSelect
          currentNovel={novel}
          novels={novels}
          onChange={onNovelChange}
          >
          {isPrewriting(novel) ? (
            <PrewritingView
              contributor={contributor}
              novel={novel}
              />
          ) : (
            <Novel
              novel={novel}
              novels={novels}
              vocabulary={vocabulary}
              places={places}
              characters={characters}
              plotItems={plotItems}
              onChapterChange={onChapterChange}
              onVoteChange={onVoteChange}
              onVoteCast={onVoteCast}
              voteText={voteText}
              />
          )}
        </NovelSelect>
      </View>
    );
  }
}

export default Relay.createContainer(Notebook, {
  fragments: {
    contributor: () => Relay.QL`
      fragment on Contributor {
        ${PrewritingView.getFragment('contributor')}
      }
    `,
    novel: () => Relay.QL`
      fragment on Novel {
        id
        latestChapter {
          id
        }
        stage {
          name
        }
        ${PrewritingView.getFragment('novel')}
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
