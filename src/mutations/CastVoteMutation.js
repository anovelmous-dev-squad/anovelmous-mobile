import Relay from 'react-relay';

export default class CastVoteMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{castVote}`;
  }

  getVariables() {
    const { resourceId, chapter, ordinal, contributor } = this.props;
    return {
      resourceId,
      chapterId: chapter.id,
      ordinal,
      contributorId: contributor.id
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CastVote {
        contributor {
          votes
        }
      }
    `;
  }

  getConfigs() {
    const rangeAdd = {
      type: 'RANGE_ADD',
      parentName: 'contributor',
      parentID: this.props.contributor.id,
      connectionName: 'votes',
      edgeName: 'newVoteEdge',
      rangeBehaviors: {
        '': 'append'
      }
    }; // TODO: fix backend mutation to support `newVoteEdge`
    return [];
  }

  static fragments = {
    chapter: () => Relay.QL`
      fragment on Chapter {
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
