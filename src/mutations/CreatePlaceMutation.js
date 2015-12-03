import Relay from 'react-relay';

export default class CreatePlaceMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{createPlace}`;
  }

  getVariables() {
    const { name, description, novel, contributor } = this.props;
    return {
      name,
      description,
      novelId: novel.id,
      contributorId: contributor.id
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreatePlace {
        contributor {
          places
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
