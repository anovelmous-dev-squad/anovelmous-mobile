import Relay from 'react-relay';

export default class CreatePlotItemMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{createPlotItem}`;
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
      fragment on CreatePlotItem {
        contributor {
          plotitems
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
