import React, { Component } from 'react';
import { ImageBackground, Text } from 'react-native';

import principalInfoImage from '../../img/principal-info.png';

import styles from './styles';

const TicketInfo = ({ text }) => (
  <ImageBackground source={principalInfoImage} style={styles.principalInfo}>
    <Text style={styles.principalInfoText}>{text}</Text>
  </ImageBackground>
);

export default TicketInfo;