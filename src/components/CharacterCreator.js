import React, {
  TextField,
  TouchableOpacity,
  View,
} from 'react-native';

import { PrimaryText } from './text';

export default class CharacterCreator extends React.Component {
  static propTypes = {
    onCreate: React.PropTypes.func,
  }

  constructor() {
    super();
    this.state = { firstName: '', lastName: '', bio: '' };
  }

  _resetFormData() {
    this.setState({ firstName: '', lastName: '', bio: '' });
  }

  _handleFirstNameChange(event) {
    this.setState({ firstName: event.target.value });
  }

  _handleLastNameChange(event) {
    this.setState({ lastName: event.target.value });
  }

  _handleBioChange(event) {
    this.setState({ bio: event.target.value });
  }

  _handleOnCreate() {
    const { firstName, lastName, bio } = this.state;
    this.props.onCreate({
      firstName, lastName, bio,
    });
    this._resetFormData();
  }

  render() {
    const { firstName, lastName, bio } = this.state;
    return (
      <View>
        <PrimaryText>Create a character!</PrimaryText>
        <TextField
          placeholder="First Name"
          value={firstName}
          onChangeText={this._handleFirstNameChange}
        />
        <TextField
          placeholder="Last Name"
          value={lastName}
          onChangeText={this._handleLastNameChange}
        />
        <TextField
          placeholder="Short bio"
          value={bio}
          onChangeText={this._handleBioChange}
        />
        <TouchableOpacity onPress={this.handleOnCreate}>
          <View>
            <PrimaryText>Create!</PrimaryText>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
