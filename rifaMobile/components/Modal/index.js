import React from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import styles from './styles';

const Modal = ({ children, style, onModalClose }) => (
  <View style={styles.modalBackground}>
    <StatusBar backgroundColor="rgba(0, 0, 0, 0.8)" barStyle="light-content" />
    { onModalClose ?
    <TouchableOpacity onPress={onModalClose} style={styles.closeIcon}>
      <Icon name="close" size={20} color="white" />
    </TouchableOpacity>
    : null }
    <View style={style ? [styles.modal, style] : styles.modal}>
      { children }
    </View>
  </View>
)

export default Modal;