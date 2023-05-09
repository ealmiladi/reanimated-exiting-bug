import * as React from 'react';
import {View, Text} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {useEffect} from 'react';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

const Route = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}}>
    <Animated.View
      entering={FadeIn.duration(250)}
      /* REMOVING exiting={FadeOut.duration(100)} FIXES THE ISSUE */
      exiting={FadeOut.duration(100)}
      style={{backgroundColor: 'green'}}>
      <Text>Number</Text>
    </Animated.View>
  </View>
);

const renderScene = SceneMap({
  first: Route,
});

export default function TabViewExample() {
  const [unmountTabView, setUnmountTabView] = React.useState(false);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([{key: 'first', title: 'First'}]);

  useEffect(() => {
    setTimeout(() => {
      setUnmountTabView(true);
    }, 3000);
  }, []);

  if (!unmountTabView) {
    return (
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
      />
    );
  }

  return (
    <View>
      <Text>Completely blank screen</Text>
    </View>
  );
}
