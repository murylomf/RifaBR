import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation'
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import TicketInfo from '../../components/TicketInfo';

import colors from '../../configs/colors';
import styles from './styles';

import textLogo from '../../img/text-logo.png';

class Profile extends Component {
  exit = async () => {
    try {
      await AsyncStorage.setItem('token', '');
      this.navigate('FirstScreen');
    } catch(error) {
      ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
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
    const { user, sentence } = this.props;

  	return (
  	  <View style={styles.profile}>
  	    <StatusBar backgroundColor={colors.background} barStyle="light-content" />
  	  
        <View>
          <Image source={textLogo} style={styles.textLogo} />
        </View>

        <View style={styles.userInfoView}>
          <TicketInfo text={`ID: ${user.id}`} />
          <TicketInfo text={`Email: ${user.email}`} />
          <TouchableOpacity style={styles.exitView} onPress={this.exit}>
            <Text style={styles.exitText}>Sair</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sentenceView}>
          <Text style={styles.sentence}>{sentence}</Text>
        </View>
  	  </View>
  	);
  }
}

export default connect(state => ({ user: state.users.user, sentence: state.users.profileSentence }))(Profile);