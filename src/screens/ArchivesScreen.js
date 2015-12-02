import React, {
  Navigator,
  Text,
  View,
} from 'react-native';

import Library from '../containers/Library';

import ViewerQueryConfig from '../queryConfigs/ViewerQueryConfig';
import { relayRenderScene } from '../utils';


export default class ArchivesScreen extends React.Component {
  render() {
    return (
      <Navigator
        initialRoute={{
          title: 'Library',
          Component: Library,
          queryConfig: new ViewerQueryConfig(),
          index: 0,
        }}
        renderScene={relayRenderScene}
        />
    );
  }
}
