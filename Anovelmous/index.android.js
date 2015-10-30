'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const Anovelmous = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
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

AppRegistry.registerComponent('Anovelmous', () => Anovelmous);
