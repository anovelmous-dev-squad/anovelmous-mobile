import React, { View, Text } from 'react-native';

const contributor = { id: "1", votes: [{id: "1", selected: true}, {id: "2", selected: false}]};

import { PrimaryText } from '../components/text';

export default ProfileStats = React.createClass({
  render: function() {
    return (
      <View>
        {contributor.votes.map(vote => (
          <PrimaryText>Vote {vote.selected ? "Counted!" : "Disregarded"}</PrimaryText>
        ))}
      </View>
    );
  }
});
