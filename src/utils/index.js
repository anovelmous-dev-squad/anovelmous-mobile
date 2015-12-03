import React from 'react-native';
import Relay from 'react-relay';

export const relayRenderScene = (route, navigator) => {
  const { Component, queryConfig } = route;
  return (
    <Relay.RootContainer
      Component={Component}
      route={queryConfig}
      renderFetched={(data) => (
        <Component
          route={route}
          navigator={navigator}
          {...data}
          {...route.props}
        />
      )}
    />
  );
};

export const isPrewriting = (novel) => {
  return !(novel.stage.name === 'WRITING' || novel.stage.name === 'FINISHED');
};
