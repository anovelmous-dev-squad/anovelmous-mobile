import Relay from 'react-relay';

export default class CreateCharacterMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{createCharacter}`;
  }

  getVariables() {
    const { firstName, lastName, bio, novel, contributor } = this.props;
    return {
      firstName,
      lastName,
      bio,
      novelId: novel.id,
      contributorId: contributor.id
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreateCharacter {
        contributor {
          characters
        }
      }
    `;
  }

  getConfigs() {
    return [];
  }

  static fragments = {
    novel: () => Relay.QL`
      fragment on Novel {
        id
      }
    `,
    contributor: () => Relay.QL`
      fragment on Contributor {
        id
      }
    `
  };
}
