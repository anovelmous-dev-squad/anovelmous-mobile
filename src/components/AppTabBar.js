import React, {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabs: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'white',
  },
});

export default class AppTabBar extends React.Component {
  static propTypes: {
    textStyle: React.PropTypes.object,
    tabsStyle: React.PropTypes.object,
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    widthOffset: React.PropTypes.number,
  }

  renderTabOption(name, page) {
    const isTabActive = this.props.activeTab === page;
    const { textStyle } = this.props;

    return (
      <TouchableOpacity style={[styles.tab]} key={name} onPress={() => this.props.goToPage(page)}>
        <View>
          <Text style={[{
            color: isTabActive ? 'white' : 'grey',
            fontWeight: isTabActive ? 'bold' : 'normal',
            fontSize: 20,
          }, textStyle]}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { tabs, widthOffset, tabsStyle } = this.props;
    const numberOfTabs = tabs.length;

    const containerWidth = widthOffset ? deviceWidth - widthOffset : deviceWidth;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 4,
      backgroundColor: 'white',
      bottom: 0,
    };

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0, containerWidth / numberOfTabs]
    });

    return (
      <View style={[styles.tabs, tabsStyle]}>
        {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        <Animated.View style={[tabUnderlineStyle, {left}]} />
      </View>
    );
  }
}
