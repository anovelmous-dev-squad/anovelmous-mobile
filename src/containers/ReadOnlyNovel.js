import React, {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Relay from 'react-relay';

class ReadOnlyNovel extends React.Component {
  static propTypes = {
    novel: React.PropTypes.object.isRequired,
  }

  renderChapter(chapter) {
    return (
      <TouchableOpacity
        onPress={() => {}}>
        <Text>chapter</Text>
      </TouchableOpacity>
    );
  }

  render() {
    //{novel.chapters.edges.map(edge => this.renderChapter(edge.node))}
    const { novel } = this.props;
    return (
      <ScrollView>
        {novel.latestChapter.text}
      </ScrollView>
    );
  }
}

export default Relay.createContainer(ReadOnlyNovel, {
  fragments: {
    novel: () => Relay.QL`
      fragment on Novel {
        id
        title
        latestChapter {
          id
          text
        }
        chapters(last: 4) {
          edges {
            node {
              id
              title
              isCompleted
            }
          }
        }
      }
    `,
  },
});
