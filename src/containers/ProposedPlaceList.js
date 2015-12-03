import React, {
  View,
} from 'react-native';
import Relay from 'react-relay';
import ScoreCard from '../components/ScoreCard';


class ProposedPlaceList extends React.Component {
  static propTypes = {
    contributor: React.PropTypes.object.isRequired,
    places: React.PropTypes.object.isRequired,
  };

  renderPlaceCard(place) {
    const { contributor } = this.props;
    return (
      <ScoreCard
        id={place.id}
        score={place.voteScore}
        title={place.name}
        description={place.description}
        onUpvote={(id) => console.log(id)}
        />
    );
  }

  render() {
    const { places } = this.props;
    return (
      <View>
        {places.edges.map(edge => this.renderPlaceCard(edge.node))}
      </View>
    );
  }
}

export default Relay.createContainer(ProposedPlaceList, {
  fragments: {
    contributor: () => Relay.QL`
      fragment on Contributor {
        id
        username
      }
    `,
    places: () => Relay.QL`
      fragment on PlaceConnection {
        edges {
          node {
            id
            voteScore
            name
            description
          }
        }
      }
    `
  }
});
