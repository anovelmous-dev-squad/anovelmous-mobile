'use strict';

import React, {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default ContributeScreen = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text>Contribute</Text>
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
