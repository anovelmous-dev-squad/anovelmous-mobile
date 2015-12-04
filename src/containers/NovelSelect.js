import React, {
  Dimensions,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import Relay from 'react-relay';

import {
  Select,
  Option,
  OptionList,
  updatePosition,
} from 'react-native-dropdown';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  selectionContainer: {
    width: deviceWidth * (2 / 3),
  },
  selectionRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  select: {
    borderColor: 'white',
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
});

class NovelSelect extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
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
    const { title, currentNovel, novels, onChange } = this.props;
    return (
      <View>
        <View style={styles.selectionContainer}>
          <View style={styles.selectionRow}>
            {title && <Text style={{fontSize: 20}}>{title}</Text>}
            <Select
              style={styles.select}
              ref="NovelSelect"
              optionListRef={this._getOptionList.bind(this)}
              defaultValue={currentNovel.title}
              onSelect={(novel) => onChange(novel.id)}
              >
              {novels.edges.map(edge => this.renderNovelOption(edge.node))}
            </Select>
          </View>
        </View>
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
