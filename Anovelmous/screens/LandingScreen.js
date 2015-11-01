'use strict';

import React, {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Library from '../containers/Library';
import Novel from '../containers/Novel';
import Chapter from '../containers/Chapter';

export default LandingScreen = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => (
            this.props.navigator.immediatelyResetRouteStack(
              [
                { title: 'Anovelmous', component: LandingScreen, ...this.props },
                { title: 'Library', component: Library, ...this.props },
                { title: 'Novel', component: Novel, ...this.props },
                { title: 'Chapter', component: Chapter, ...this.props }
              ]
            )
          )}>
          <Text>Read Live Novel</Text>
        </TouchableOpacity>
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
