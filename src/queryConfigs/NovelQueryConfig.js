import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    novel: () => Relay.QL`query { novel(id: $novelId) }`,
  };
  static routeName = 'NovelQueryConfig';
  static paramDefinitions ={
    novelId: {required: true},
  }
}
