'use strict';

import React, {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Library from '../containers/Library';

export default ArchivesScreen = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Library navigator={this.props.navigator}/>
      </View>
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
