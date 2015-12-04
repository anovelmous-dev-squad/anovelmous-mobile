import React, {
  Dimensions,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Relay from 'react-relay';

import ReadOnlyNovel from './ReadOnlyNovel';

import NovelQueryConfig from '../queryConfigs/NovelQueryConfig';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: deviceWidth,
  },
  novelPreview: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    padding: 2,
  },
  novelTitle: {
    color: 'white',
  },
});

class Library extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired,
    navigator: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const finishedNovels = props.viewer.novels.edges.map(edge => edge.node)
      .filter(novel => novel.stage.name === 'FINISHED');
    this.state = {
      dataSource: ds.cloneWithRows(finishedNovels),
    };
  }

  renderNovelPreview(novel) {
    return (
      <TouchableOpacity
        style={{height: 80, backgroundColor: '#B7B7B7'}}
        onPress={() => this.props.navigator.push({
          title: novel.title,
          Component: ReadOnlyNovel,
          queryConfig: new NovelQueryConfig({novelId: novel.id}),
        })}>
        <View style={styles.novelPreview}>
          <Text style={styles.novelTitle}>{novel.title}</Text>
          <Text style={styles.novelPlot}>{novel.plot.summary.slice(0, 100) + '...'}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(novel) => this.renderNovelPreview(novel)}
        style={styles.container}
        />
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
              stage {
                name
              }
              plot {
                summary
              }
            }
          }
        }
      }
    `,
  },
});
