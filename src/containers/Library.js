import React, {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Relay from 'react-relay';

import ReadOnlyNovel from './ReadOnlyNovel';

import NovelQueryConfig from '../queryConfigs/NovelQueryConfig';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});

class Library extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired,
    navigator: React.PropTypes.object.isRequired,
  }
  renderNovelPreview(novel) {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigator.push({
          title: novel.title,
          Component: ReadOnlyNovel,
          queryConfig: new NovelQueryConfig({novelId: novel.id}),
        })}>
        <Text style={{color:'black', fontSize: 20}}>{novel.title}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { viewer } = this.props;
    return (
      <View style={styles.card}>
        <ScrollView>
          {viewer.novels.edges.map(edge => this.renderNovelPreview(edge.node))}
        </ScrollView>
      </View>
    );
  }
}

export default Relay.createContainer(Library, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Query {
        novels(first: 30) {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    `,
  },
});
