import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    viewer: () => Relay.QL`query { novel(id: $novelId) }`,
  };
  static routeName = 'ViewerQueryConfig';
  static paramDefinitions ={
    novelId: {required: true},
  }
}
