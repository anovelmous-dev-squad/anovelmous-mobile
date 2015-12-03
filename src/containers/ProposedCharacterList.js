import React, {
  View,
} from 'react-native';
import Relay from 'react-relay';
import ScoreCard from '../components/ScoreCard';


class ProposedCharacterList extends React.Component {
  static propTypes = {
    contributor: React.PropTypes.object.isRequired,
    characters: React.PropTypes.object.isRequired,
  };

  renderCharacterCard(character) {
    return (
      <ScoreCard
        id={character.id}
        score={character.voteScore}
        title={character.firstName}
        description={character.bio}
        onUpvote={(id) => console.log(id)}
        />
    );
  }

  render() {
    const { characters } = this.props;
    return (
      <View>
        {characters.edges.map(edge => this.renderCharacterCard(edge.node))}
      </View>
    );
  }
}

export default Relay.createContainer(ProposedCharacterList, {
  fragments: {
    contributor: () => Relay.QL`
      fragment on Contributor {
        id
        username
      }
    `,
    characters: () => Relay.QL`
      fragment on CharacterConnection {
        edges {
          node {
            id
            firstName
            bio
            voteScore
          }
        }
      }
    `,
  },
});
