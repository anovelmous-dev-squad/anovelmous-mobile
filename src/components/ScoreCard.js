import React, {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    marginTop: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  scoreSize: {
    fontSize: 20,
  },
  upvoteText: {
    color: '#B71C1C',
  },
  downvoteText: {
    color: '#B3B3B3',
  },
});

export default class ScoreCard extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    onUpvote: React.PropTypes.func,
    onDownvote: React.PropTypes.func,
  };

  render() {
    const { id, score, title, description, onUpvote, onDownvote } = this.props;
    return (
      <View style={styles.card}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start'}}>
          <View style={{width: 35}}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <TouchableOpacity
                onPress={() => onUpvote ? onUpvote(id) : {}}>
                <Text style={[styles.scoreSize, styles.upvoteText]}>⇧</Text>
              </TouchableOpacity>
              <Text style={styles.scoreSize}> {score} </Text>
              <TouchableOpacity
                onPress={() => onDownvote ? onDownvote(id) : {}}>
                <Text style={[styles.scoreSize, styles.downvoteText]}>⇩</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={{fontSize: 20, marginBottom: 5}}>{title}</Text>
            <Text>{description}</Text>
          </View>
        </View>
      </View>
    );
  }
}
