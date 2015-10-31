'use strict';

import React, {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const chapters = [{ id: '1', title: 'Chapter 1' }, { id: '2', title: 'Chapter 2' }];

export default TableOfContents = React.createClass({
  getInitialState: function() {
    return { chapters: chapters };
  },

  renderChapter: function(chapter) {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigator.push({
          title: 'Reader',
          component: Reader,
          props: {
            chapterId: chapter.id,
            ...this.props
          }
        })}>
        <Text>{chapter.title}</Text>
      </TouchableOpacity>
    );
  },

  render: function() {
    const { chapters } = this.state;
    return (
      <ScrollView>
        {chapters.map(chapter => this.renderChapter(chapter))}
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
