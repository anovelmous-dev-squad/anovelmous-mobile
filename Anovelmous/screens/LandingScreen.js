'use strict';

import React, {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Library from '../containers/Library';
import TableOfContents from '../containers/TableOfContents';
import Reader from '../containers/Reader';

export default LandingScreen = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => (
            this.props.navigator.immediatelyResetRouteStack(
              [
                { title: 'Anovelmous', component: LandingScreen, ...this.props },
                { title: 'Library', component: Library, ...this.props },
                { title: 'Table Of Contents', component: TableOfContents, ...this.props },
                { title: 'Reader', component: Reader, ...this.props }
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
