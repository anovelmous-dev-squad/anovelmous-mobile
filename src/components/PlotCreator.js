import React, {
  TextField,
  TouchableOpacity,
  View,
} from 'react-native';

export default class PlotCreator extends React.Component {
  static propTypes = {
    onCreate: React.PropTypes.func,
  }

  constructor() {
    super();
    this.state = { summary: '' };
  }

  _resetFormData() {
    this.setState({ summary: '' });
  }

  _handleSummaryChange(event) {
    this.setState({ summary: event.target.value });
  }

  _handleOnSubmit(event) {
    event.preventDefault();
    const { summary } = this.state;
    this.props.onCreate(summary);
    this._resetFormData();
  }

  render() {
    const { summary } = this.state;
    return (
      <View>
        <TextField
          placeholder="Enter a brief summary of the novel's plot"
          value={summary}
          onChangeText={this._handleSummaryChange}
          />
        <TouchableOpacity
          onPress={this._handleOnSubmit} />
      </View>
    );
  }
}
