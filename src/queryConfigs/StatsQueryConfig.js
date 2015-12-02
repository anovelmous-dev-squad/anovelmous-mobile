import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    contributor: () => Relay.QL`query { contributor(id: $contributorId) }`,
    viewer: () => Relay.QL`query { viewer }`,
  };
  static routeName = 'StatsQueryConfig';
  static paramDefinitions ={
    contributorId: {required: true},
  }
}
