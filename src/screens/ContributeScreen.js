import React, {
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  base: {
    color: 'black',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});


export default class ContributeScreen extends React.Component {
  constructor() {
    super();
    this.state = { voteText: '' };
  }

  render() {
    return (
      <View style={styles.card}>
        <TextInput
          style={{height: 40}}
          onChangeText={(voteText) => this.setState({voteText})}
          value={this.state.voteText}
          />
      </View>
    );
  }
}
