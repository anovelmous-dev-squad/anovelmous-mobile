import React, {
  View
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import Chapter from './Chapter';
import CustomTabBar from '../components/CustomTabBar';

const chapters = [{ id: '1', title: 'Chapter 1' }, { id: '2', title: 'Chapter 2' }];

export default Contribute = React.createClass({
  getInitialState: function() {
    return {};
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
    return (
      <ScrollableTabView renderTabBar={() => <CustomTabBar tabs={novel.chapters} />}>
        {chapters.map(chapter => (
          this.renderPage(chapter)
        ))}
      </ScrollableTabView>
    );
  }
});
