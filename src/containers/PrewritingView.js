import React, {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Relay from 'react-relay';
import ProposedPlotList from './ProposedPlotList';
import ProposedCharacterList from './ProposedCharacterList';
import ProposedPlaceList from './ProposedPlaceList';
import ProposedPlotItemList from './ProposedPlotItemList';
import AppTabBar from '../components/AppTabBar';
import CharacterCreator from '../components/CharacterCreator';
import PlaceCreator from '../components/PlaceCreator';
import PlotItemCreator from '../components/PlotItemCreator';
import PlotCreator from '../components/PlotCreator';
import CreateCharacterMutation from '../mutations/CreateCharacterMutation';
import CreatePlaceMutation from '../mutations/CreatePlaceMutation';
import CreatePlotItemMutation from '../mutations/CreatePlotItemMutation';
import CreatePlotMutation from '../mutations/CreatePlotMutation';

import ScrollableTabView from 'react-native-scrollable-tab-view';

class PrewritingView extends React.Component {
  static propTypes = {
    contributor: React.PropTypes.object.isRequired,
    novel: React.PropTypes.object.isRequired,
  };

  _handlePlotCreation = (summary) => {
    Relay.Store.update(
      new CreatePlotMutation({
        summary,
        novel: this.props.novel,
        contributor: this.props.contributor,
      })
    );
  };

  _handleCharacterCreation = ({ firstName, lastName, bio }) => {
    Relay.Store.update(
      new CreateCharacterMutation({
        firstName,
        lastName,
        bio,
        novel: this.props.novel,
        contributor: this.props.contributor,
      })
    );
  };

  _handlePlaceCreation = ({ name, description }) => {
    Relay.Store.update(
      new CreatePlaceMutation({
        name,
        description,
        novel: this.props.novel,
        contributor: this.props.contributor,
      })
    );
  };

  _handlePlotItemCreation = ({ name, description }) => {
    Relay.Store.update(
      new CreatePlotItemMutation({
        name,
        description,
        novel: this.props.novel,
        contributor: this.props.contributor,
      })
    );
  };

  _getCurrentStageView = (stage) => {
    switch (stage.name) {
    case 'BRAINSTORMING':
      return this.renderBrainstormingStage();
    case 'PLOT SUMMARY':
      return this.renderPlotSummaryStage();
    case 'STRUCTURE CREATION':
      return this.renderStructureCreationStage();
    case 'TITLE DECISION':
      return this.renderTitleDecisionStage();
    default:
      return <Text>this should not happen.</Text>;
    }
  };

  renderBrainstormingStage() {
    return <View><Text>Think about the upcoming novel.</Text></View>;
  }

  renderPlotSummaryStage() {
    const { novel, contributor } = this.props;
    return (
      <View>
        <ProposedPlotList plots={novel.proposedPlots} contributor={contributor} />
        <PlotCreator maxSummaryLength={3000} onCreate={this._handlePlotCreation} />
      </View>
    );
  }

  renderStructureCreationStage() {
    const { novel, contributor } = this.props;
    return (
        <ScrollableTabView renderTabBar={() => <AppTabBar />}>
          <View tabLabel="Characters">
            <ProposedCharacterList characters={novel.proposedCharacters}
                                   contributor={contributor}/>
            <CharacterCreator onCreate={this._handleCharacterCreation}/>
          </View>
          <View tabLabel="Places">
            <ProposedPlaceList places={novel.proposedPlaces}
                               contributor={contributor}/>
            <PlaceCreator onCreate={this._handlePlaceCreation}/>
          </View>
          <View tabLabel="Plot Items">
            <ProposedPlotItemList plotItems={novel.proposedPlotitems}
                                  contributor={contributor}/>
            <PlotItemCreator onCreate={this._handlePlotItemCreation}/>
          </View>
        </ScrollableTabView>
    );
  }

  renderTitleDecisionStage() {
    return <div>Vote on novel title</div>;
  }

  render() {
    const { novel } = this.props;
    return (
      <View>
        {this._getCurrentStageView(novel.stage)}
      </View>
    );
  }
}

export default Relay.createContainer(PrewritingView, {
  fragments: {
    contributor: () => Relay.QL`
      fragment on Contributor {
        id
        plots(first: 5) {
          edges {
            node {
              summary
            }
          }
        }
        characters(first: 5) {
          edges {
            node {
              firstName
              lastName
              bio
            }
          }
        }
        places(first: 5) {
          edges {
            node {
              name
              description
            }
          }
        }
        plotitems(first: 5) {
          edges {
            node {
              name
              description
            }
          }
        }
        ${ProposedPlotList.getFragment('contributor')}
        ${ProposedCharacterList.getFragment('contributor')}
        ${ProposedPlaceList.getFragment('contributor')}
        ${ProposedPlotItemList.getFragment('contributor')}
        ${CreatePlotMutation.getFragment('contributor')}
        ${CreateCharacterMutation.getFragment('contributor')}
        ${CreatePlaceMutation.getFragment('contributor')}
        ${CreatePlotItemMutation.getFragment('contributor')}
      }
    `,
    novel: () => Relay.QL`
      fragment on Novel {
        title
        stage {
          name
        }
        proposedPlots(first: 20) {
          ${ProposedPlotList.getFragment('plots')}
        }
        proposedCharacters(first: 20) {
          ${ProposedCharacterList.getFragment('characters')}
        }
        proposedPlaces(first: 20) {
          ${ProposedPlaceList.getFragment('places')}
        }
        proposedPlotitems(first: 20) {
          ${ProposedPlotItemList.getFragment('plotItems')}
        }
        ${CreatePlotMutation.getFragment('novel')}
        ${CreateCharacterMutation.getFragment('novel')}
        ${CreatePlaceMutation.getFragment('novel')}
        ${CreatePlotItemMutation.getFragment('novel')}
      }
    `,
  },
});
