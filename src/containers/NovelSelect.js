import React, {
  View,
  Text,
} from 'react-native';
import Relay from 'react-relay';

import {
  Select,
  Option,
  OptionList,
  updatePosition,
} from 'react-native-dropdown';

class NovelSelect extends React.Component {
  static propTypes = {
    currentNovel: React.PropTypes.object.isRequired,
    novels: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    children: React.PropTypes.element,
  }

  componentDidMount() {
    updatePosition(this.refs.NovelSelect);
    updatePosition(this.refs.OPTIONLIST);
  }

  _getOptionList() {
    return this.refs.OPTIONLIST;
  }

  renderNovelOption(novel) {
    return <Option value={novel}>{novel.title}</Option>;
  }

  render() {
    const { currentNovel, novels, onChange } = this.props;
    return (
      <View style={{flex: 1}}>
        <Select
          ref="NovelSelect"
          optionListRef={this._getOptionList.bind(this)}
          defaultValue={currentNovel.title}
          onSelect={(novel) => onChange(novel.id)}
          >
          {novels.edges.map(edge => this.renderNovelOption(edge.node))}
        </Select>
        {this.props.children}
        <OptionList ref="OPTIONLIST" />
      </View>
    );
  }
}

export default Relay.createContainer(NovelSelect, {
  fragments: {
    currentNovel: () => Relay.QL`
      fragment on Novel {
        id
        title
      }
    `,
    novels: () => Relay.QL`
      fragment on NovelConnection {
        edges {
          node {
            id
            title
          }
        }
      }
    `,
  },
});
