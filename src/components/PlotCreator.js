import React, {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default class PlotCreator extends React.Component {
  static propTypes = {
    maxSummaryLength: React.PropTypes.number,
    onCreate: React.PropTypes.func,
  }

  constructor() {
    super();
    this.state = { summary: '' };
  }

  _resetFormData() {
    this.setState({ summary: '' });
  }

  _handleSummaryChange(summary) {
    this.setState({ summary });
  }

  _handleOnSubmit() {
    const { summary } = this.state;
    this.props.onCreate(summary);
    this._resetFormData();
  }

  render() {
    const { summary } = this.state;
    return (
      <View style={{flex: 1}}>
        <TextInput
          placeholder="Enter a brief summary of the novel's plot"
          value={summary}
          onChangeText={(text) => this._handleSummaryChange(text)}
          />
        <TouchableOpacity
          onPress={() => this._handleOnSubmit()}>
          <Text>Create</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
