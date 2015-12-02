import React, {
  TextField,
  View,
} from 'react-native';

export default PlotCreator = React.createClass({
  getInitialState: function() {
    return { summary: '' };
  },

  _resetFormData: function() {
    this.setState({ summary: '' });
  },

  _handleSummaryChange: function(event) {
    this.setState({ summary: event.target.value });
  },

  _handleOnSubmit: function(event) {
    event.preventDefault();
    const { summary } = this.state;
    this.props.onCreate(summary);
    this._resetFormData();
  },

  render: function() {
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
});
