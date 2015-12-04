import React, {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Relay from 'react-relay';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import AppTabBar from '../components/AppTabBar';

const deviceWidth = Dimensions.get('window').width;

class ReadOnlyNovel extends React.Component {
  static propTypes = {
    novel: React.PropTypes.object.isRequired,
  }

  renderChapter(chapter) {
    return (
      <ScrollView
        style={{width: deviceWidth}}
        tabLabel={chapter.title}>
        <Text>{chapter.text}</Text>
      </ScrollView>
    );
  }

  render() {
    const { novel } = this.props;
    return (
      <ScrollableTabView renderTabBar={() => <AppTabBar />}>
        {novel.chapters.edges.map(edge => this.renderChapter(edge.node))}
      </ScrollableTabView>
    );
  }
}

export default Relay.createContainer(ReadOnlyNovel, {
  fragments: {
    novel: () => Relay.QL`
      fragment on Novel {
        id
        title
        chapters(first: 4) {
          edges {
            node {
              id
              title
              isCompleted
              text
            }
          }
        }
      }
    `,
  },
});
