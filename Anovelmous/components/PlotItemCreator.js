import React, {
  TextField,
  TouchableOpacity,
  View,
} from 'react-native';

import { PrimaryText } from './text';

export default PlotItemCreator = React.createClass({
  getInitialState: function() {
    return { name: '', description: '' };
  },

  _resetFormData: function() {
    this.setState({ name: '', description: '' });
  },

  _handleNameChange: function(event) {
    this.setState({ name: event.target.value });
  },

  _handleDescriptionChange: function(event) {
    this.setState({ description: event.target.value });
  },

  _handleOnCreate: function() {
    const { name, description } = this.state;
    this.props.onCreate({
      name, description
    });
    this._resetFormData();
  },

  render() {
    const { name, description } = this.state;
    return (
      <View>
        <PrimaryText>Create a place!</PrimaryText>
        <TextField
          placeholder="Abacaderon Scepter"
          value={name}
          onChangeText={this._handleNameChange}
        />
        <TextField
          placeholder="Transmogrifies foes"
          value={description}
          onChangeText={this._handleDescriptionChange}
        />
        <View>
          <TouchableOpacity onPress={this._handleOnCreate}>
            <PrimaryText>Create!</PrimaryText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
});
