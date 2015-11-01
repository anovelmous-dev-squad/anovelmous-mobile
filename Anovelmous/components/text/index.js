import React, { Text } from 'react-native';

export const AppText = React.createClass({
  render: function() {
    const { children } = this.props;
    return <Text style={{ fontFamily: 'Roboto', color: '#FFFFFF'}}>{children}</Text>;
  }
});

export const PrimaryText = React.createClass({
  render: function() {
    const { children } = this.props;
    return <Text style={{ fontFamily: 'Roboto', color: '#212121'}}>{children}</Text>;
  }
});

export const SecondaryText = React.createClass({
  render: function() {
    const { children } = this.props;
    return <Text style={{ fontFamily: 'Roboto', color: '#727272'}}>{children}</Text>
  }
});
