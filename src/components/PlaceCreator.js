import React, {
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { PrimaryText } from './text';

export default class PlaceCreator extends React.Component {
  static propTypes = {
    onCreate: React.PropTypes.func,
  }

  constructor() {
    super();
    this.state = { name: '', description: '' };
  }

  _resetFormData() {
    this.setState({ name: '', description: '' });
  }

  _handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  _handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  _handleOnCreate() {
    const { name, description } = this.state;
    this.props.onCreate({
      name, description,
    });
    this._resetFormData();
  }

  render() {
    const { name, description } = this.state;
    return (
      <View>
        <PrimaryText>Create a place!</PrimaryText>
        <TextInput
          placeholder="New York City"
          value={name}
          onChangeText={this._handleNameChange}
        />
        <TextInput
          placeholder="A large American city with mass appeal"
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
}
