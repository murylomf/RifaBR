import React from 'react';
import {AppRegistry} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Swiper from 'react-native-swiper';
import { Provider } from 'react-redux';

import store from './store';
import {name as appName} from './app.json';

import Loading from './screens/Loading';
import FirstScreen from './screens/FirstScreen';
import Principal from './screens/Principal';
import Missions from './screens/Missions';
import Profile from './screens/Profile';

const PrincipalWithSwiper = ({ navigation }) => (
    <Swiper index={1} loop={false} showsPagination={false}>
      <Missions />
      <Principal />
      <Profile navigation={navigation} />
    </Swiper>
);

const App = createAppContainer(createStackNavigator({
  Loading: { screen: Loading, navigationOptions: { header: null } },
  FirstScreen: { screen: FirstScreen, navigationOptions: { header: null } },
  Principal: { screen: PrincipalWithSwiper, navigationOptions: { header: null } }
}));

const A = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => A);
