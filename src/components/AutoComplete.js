import React, {
  Text,
  TextInput,
  View,
} from 'react-native';

export default class AutoComplete extends React.Component {
  static propTypes = {
    dataSource: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object,
    ]),
    errorStyle: React.PropTypes.object,
    errorText: React.PropTypes.string,
    filter: React.PropTypes.func,
    fullWidth: React.PropTypes.bool,
    hintText: React.PropTypes.string,
    listStyle: React.PropTypes.object,
    menuCloseDelay: React.PropTypes.number,
    menuProps: React.PropTypes.object,
    menuStyle: React.PropTypes.object,
    onNewRequest: React.PropTypes.func,
    onUpdateInput: React.PropTypes.func,
    open: React.PropTypes.bool,
    searchText: React.PropTypes.string,
    showAllItems: React.PropTypes.bool,
    style: React.PropTypes.object,
  }

  static defaultProps = {
    fullWidth: false,
    open: false,
    showAllItems: false,
    searchText: '',
    menuCloseDelay: 100,
    onUpdateInput: () => {},
    onNewRequest: () => {},
    filter: (searchText, key) => key.includes(searchText),
  }

  constructor(props) {
    super(props);
    this.state = {
      searchText: props.searchText,
      open: props.open,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.searchText !== nextProps.searchText) {
      this.setState({
        searchText: nextProps.searchText,
      });
    }
  }

  componentWillMount() {
    this.focusOnInput = false;
    this.requestsList = [];
  }

  render() {
    const {
      style,
      errorStyle,
      hintText,
      fullWidth,
      menuStyle,
      menuProps,
      listStyle,
      showAllItems,
      ...other,
    } = this.props;

    const styles = {
      root: {
        height: 200,
        width: 256,
      },
      menu: {
        top: 40,
        left: 0,
      },
      list: {
        width: 256,
      },
    };

    const textInputProps = {
      hintText: hintText ? hintText : '',
      multiLine: false,
    };

    const rootStyles = [styles.root, style];

    const displayFilter = showAllItems ? () => true : this.props.filter;
    let requestsList = [];

    const { dataSource } = this.props;
    const dataSourceList = typeof dataSource === 'object' ?
      Object.keys(dataSource).map(k => dataSource[k]) :
      dataSource;

    dataSourceList.forEach((item) => {
      switch (typeof item) {
        case 'string':
          if (displayFilter(this.state.searchText, item, item)) {
            requestsList.push(item);
          }
          break;
        case 'object':
          if (typeof item.text === 'string') {
            if (displayFilter(this.state.searchText, item.text, item.value)) {
              requestsList.push(item);
            } else if (item.display) {
              requestsList.push(item);
            }
          }
          break;
      }
    });

    this.requestsList = requestsList;

    let menu = this.state.open && (this.state.searchText !== '' || showAllItems)
               && requestsList.length > 0 ? (
      <View
        {...menuProps}
        ref="menu"
        key="dropDownMenu"
        style={menuStyle}
        >
        {requestsList.map((request, index) => {
          switch (typeof request) {
            case 'string':
              return (
                <TouchableOpacity
                  key={index}
                  value={request}
                  onPress={this._handleItemTouchTap}
                  >
                  <Text>{request}</Text>
                </TouchableOpacity>
              )
            case 'object':
              if (typeof request.text === 'string') {
                return React.cloneElement(request.value, {
                  key: request.text,
                });
              }
              return React.cloneElement(request, {
                key: index,
              });
            default:
              return null;
          }
        })}
      </View>
    ) : null;

    return (
      <View style={rootStyles}>
        <View style={{flex: 1}}>
          <TextInput
            {...other}
            ref="searchTextInput"
            style={{height: 40}}
            value={this.state.searchText}
            onSubmitEditing={() => this.setState({open: false})}
            onChangeText={(text) => this._updateRequests(text)}
            onBlur={() => {
              if (this.focusOnInput && this.state.open)
                this.refs.searchTextInput.focus();
            }}
            onFocus={() => {
              if (!this.state.open && ( showAllItems || this.state.searchText !== '')) {
                this._updateRequests(this.state.searchText);
              }
              this.focusOnInput = true;
            }}
            {...textInputProps}
            />
        </View>
        {menu}
      </View>
    );
  }

  setValue(textValue) {
    this.setState({
      searchText: textValue,
    });
  }

  getValue() {
    return this.state.searchText;
  }

  _updateRequests(searchText) {
    this.setState({
      searchText,
      open: true,
    });

    this.focusOnInput = true;

    this.props.onUpdateInput(searchText, this.props.dataSource);
  }

  _handleItemTouchTap(e, child) {
    this.setState({open: false});

    let { dataSource } = this.props;

    let chosenRequest, index, searchText;
    if (typeof dataSource[0] === 'string') {
      chosenRequest = this.requestsList[parseInt(child.key, 10)];
      index = dataSource.indexOf(chosenRequest);
      searchText = dataSource[index];
    } else {
      chosenRequest = child.key;
      index = dataSource.indexOf(
        dataSource.filter((item) => chosenRequest === item.text)[0]);
      searchText = chosenRequest;
    }

    this.setState({searchText});

    this.props.onNewRequest(chosenRequest, index, dataSource);
  }
}
