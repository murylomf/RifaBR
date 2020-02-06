import React, { Component } from 'react';
import { View, Image, StatusBar } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

import logo from '../../img/logo.png';

import colors from '../../configs/colors';
import styles from './styles';

import { setUserData, setToken } from '../../store/actions/users';

import { getUserData } from '../../utils/userRequests';

class Loading extends Component {
  componentDidMount() {
  	this.verifyUser();
  }

  verifyUser = async () => {
    const { dispatch } = this.props;

  	try {
  	  const token = await AsyncStorage.getItem('token');

  	  if(!token)
  	  	return this.navigate('FirstScreen');

  	  const user = await getUserData(token);

  	  dispatch(setUserData(user));
  	  dispatch(setToken(token));

  	  this.navigate('Principal');
  	} catch(error) {
  	  this.navigate('FirstScreen');
  	}
  }

  navigate = routeName => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName })
      ],
      key: null
    });

    this.props.navigation.dispatch(resetAction);
  }  

  render() {
  	return (
  	  <View style={styles.loading}>
  	    <StatusBar backgroundColor={colors.background} barStyle="light-content" />
  	    <Image source={logo} style={styles.logo} />
  	  </View>
  	);
  }
}

export default connect()(Loading);