import React, {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Relay from 'react-relay';

class Chapter extends React.Component {
  render() {
    const { tokens } = this.props;
    const chapterText = tokens.map(token => token.content).join(' ');
    return (
      <ScrollView>
        <Text>{chapterText}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
