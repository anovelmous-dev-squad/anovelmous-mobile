'use strict';

import React, {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const tokens = [{id: '1', content: 'hey'}, {id: '2', content: 'there'}];

export default Reader = React.createClass({
  getInitialState: function() {
    return { tokens: tokens };
  },

  render: function() {
    const { tokens } = this.state;
    const chapterText = tokens.map(token => token.content).join(' ');
    return (
      <ScrollView>
        <Text>{chapterText}</Text>
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
