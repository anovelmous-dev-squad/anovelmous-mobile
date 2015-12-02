import React, { Text } from 'react-native';

export const AppText = React.createClass({
  render: function() {
    const { children } = this.props;
    return <Text style={{ fontFamily: 'Baskerville', color: '#FFFFFF'}}>{children}</Text>;
  }
});

export const PrimaryText = React.createClass({
  render: function() {
    const { children } = this.props;
    return <Text style={{ fontFamily: 'Baskerville', color: '#212121' }}>{children}</Text>;
  }
});

export const SecondaryText = React.createClass({
  render: function() {
    const { children } = this.props;
    return <Text style={{ fontFamily: 'Baskerville', color: '#727272'}}>{children}</Text>
  }
});
