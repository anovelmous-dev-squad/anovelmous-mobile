import React, {
  View,
} from 'react-native';
import Relay from 'react-relay';
import ScoreCard from '../components/ScoreCard';


class ProposedPlotList extends React.Component {
  static propTypes = {
    contributor: React.PropTypes.object.isRequired,
    plots: React.PropTypes.object.isRequired,
  };

  renderPlotCard(plot) {
    const { contributor } = this.props;
    return (
      <ScoreCard
        id={plot.id}
        score={plot.voteScore}
        title={contributor.username + '\'s Idea'}
        description={plot.summary}
        onUpvote={(id) => console.log(id)}
        />
    );
  }

  render() {
    const { plots } = this.props;
    return (
      <View>
        {plots.edges.map(edge => this.renderPlotCard(edge.node))}
      </View>
    );
  }
}

export default Relay.createContainer(ProposedPlotList, {
  fragments: {
    contributor: () => Relay.QL`
      fragment on Contributor {
        id
        username
      }
    `,
    plots: () => Relay.QL`
      fragment on PlotConnection {
        edges {
          node {
            id
            voteScore
            summary
          }
        }
      }
    `
  }
});
