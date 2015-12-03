import Relay from 'react-relay';

export default class CreatePlotMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{createPlot}`;
  }

  getVariables() {
    const { summary, novel, contributor } = this.props;
    return {
      summary,
      novelId: novel.id,
      contributorId: contributor.id
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreatePlot {
        contributor {
          plots
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
