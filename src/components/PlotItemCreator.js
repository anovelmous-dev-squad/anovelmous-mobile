import React, {
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { PrimaryText } from './text';

export default class PlotItemCreator extends React.Component {
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
          placeholder="Abacaderon Scepter"
          value={name}
          onChangeText={this._handleNameChange}
        />
        <TextInput
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
}
