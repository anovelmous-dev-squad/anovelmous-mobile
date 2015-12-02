'use strict';

import React, {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Novel from './Novel';

const novels = [{ id: '1', title: 'Novel 1' }, { id: '2', title: 'Novel 2' }];

export default Library = React.createClass({
  getInitialState: function() {
    return { novels: novels };
  },

  renderNovel: function(novel) {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigator.push({
          title: 'Novel',
          navTitle: novel.title,
          component: Novel,
          props: {
            novelId: novel.id,
            ...this.props
          }
        })}>
        <Text>{novel.title}</Text>
      </TouchableOpacity>
    );
  },

  render: function() {
    const { novels } = this.state;
    return (
      <ScrollView>
        {novels.map(novel => this.renderNovel(novel))}
      </ScrollView>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
