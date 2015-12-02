import React from 'react';
import Relay from 'react-relay';
import Chapter from './Chapter';

import ScrollableTabView from 'react-native-scrollable-tab-view';

export default Contribute = React.createClass({
  getInitialState: function() {
    return { tabsValue: this.props.novel.chapter.id };
  },

  _handleChapterChange: function(chapterId) {
    this.setState({tabsValue: chapterId});
  },

  renderPage: function(chapter) {
    return (
      <View key={chapter.id}>
        <Chapter chapter={chapter} />
      </View>
    );
  },

  render: function() {
    const { novel } = this.props;
    return (
      <ScrollableTabView renderTabBar={() => <CustomTabBar tabs={novel.chapters} />}>
        {novel.chapters.edges.map(edge => (
          this.renderPage(edge.node)
        ))}
      </ScrollableTabView>
    );
  }
});
