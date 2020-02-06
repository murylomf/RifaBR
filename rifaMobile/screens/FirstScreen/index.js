import React, { Component } from 'react';
import { View, ScrollView, Image, Text, TextInput, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import OneSignal from 'react-native-onesignal';

import { connect } from 'react-redux';

import Modal from '../../components/Modal';

import colors from '../../configs/colors';
import styles from './styles';

import or from '../../img/or.png';
import textLogo from '../../img/text-logo.png';
import loginButtonImage from '../../img/login-button.png';
import registerButtonImage from '../../img/register-button.png';

import { setUserData, setToken } from '../../store/actions/users';

import { login, register, getUserData } from '../../utils/userRequests';
import { getTerms } from '../../utils/termsRequests';

const LoginButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={loginButtonImage} style={styles.button} />
  </TouchableOpacity>
);

const RegisterButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={registerButtonImage} style={styles.button} />
  </TouchableOpacity>
);

const LoggingModal = () => (
  <Modal>
    <Text style={styles.loadingModalText}>Entrando..</Text>
  </Modal>
);

const FinishModal = ({ terms, isRegister, onModalClose, onFinishModalButtonPress }) => (
  <Modal onModalClose={onModalClose}>
    <Text style={styles.loadingModalText}>Termos de Uso</Text>
    <Text style={styles.finishModalText}>Clicando em Cadastrar, Você Aceita os Termos de Uso</Text>

    <ScrollView style={styles.termsTextarea}>
      <Text style={styles.termsTextareaText}>{ terms }</Text>
    </ScrollView>

    { !isRegister ?
    <TouchableOpacity onPress={onFinishModalButtonPress} style={styles.finishModalButton}>
      <Text style={styles.finishModalButtonText}>Cadastrar</Text>
    </TouchableOpacity> : null }
    
    { isRegister ?
    <View style={styles.finishModalButton}>
      <Text style={styles.finishModalButtonText}>Cadastrando..</Text>
    </View> : null }
  </Modal>
);

class FirstScreen extends Component {
  state = {
    email: '',
    password: '',
  	error: '',
    terms: 'Carregando Termos..',
    finishModalOpen: false,
    loginModalOpen: false,
    isRegister: false
  }

  constructor(props) {
  	super(props);

    this.passwordInput = undefined;
  }

  componentDidMount() {
    OneSignal.init('7e983dce-74e9-42e0-b8ff-407eb128fd49');
    this.setTerms();
  }

  setTerms = async () => {
    try {
      const terms = await getTerms();
      this.setState({ terms });
    } catch(error) {
      this.setState({ terms: error });
    }
  }

  onRegisterButtonPress = () => {
    const { email, password } = this.state;

    if(!email)
      return this.setState({ error: 'Digite seu Email para se Cadastrar' });

    if(!password)
      return this.setState({ error: 'Digite sua Senha para se Cadastrar' });

    this.setState({ finishModalOpen: true });
  }

  onLoginButtonPress = async () => {
    const { email, password } = this.state;   
    const { dispatch } = this.props; 

    if(!email)
      return this.setState({ error: 'Digite seu Email para Entrar' });

    if(!password)
      return this.setState({ error: 'Digite sua Senha para Entrar' });

    this.setState({ loginModalOpen: true });

    try {
      const token = await login(email, password);
      const user = await getUserData(token);

      await AsyncStorage.setItem('token', token);

      OneSignal.sendTag('email', user.email);

      dispatch(setUserData(user));
      dispatch(setToken(token));

      this.navigate('Principal');
    } catch(error) {
      this.setState({ loginModalOpen: false, error });
    }
  }

  onFinishModalButtonPress = async () => {
    const { email, password } = this.state; 
    const { dispatch } = this.props; 

    this.setState({ isRegister: true });

    try {
      const token = await register(email, password);
      const user = await getUserData(token);

      await AsyncStorage.setItem('token', token);

      OneSignal.sendTag('email', user.email);

      dispatch(setUserData(user));
      dispatch(setToken(token));

      this.navigate('Principal');
    } catch(error) {
      this.setState({ isRegister: false, error, finishModalOpen: false });
    }
  }

  onEmailSubmit = () => this.passwordInput.focus();

  onFinishModalClose = () => this.setState({ finishModalOpen: false });

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
  	const { onEmailSubmit, onEnterSubmit, onFinishModalClose, onRegisterButtonPress, onLoginButtonPress, onFinishModalButtonPress, state } = this;
  	const { email, password, error, terms, finishModalOpen, loginModalOpen, isRegister } = state;

    return (
      <View style={styles.firstScreen}>
        <StatusBar backgroundColor={colors.background} barStyle="light-content" />
        
        <View style={styles.logoView}>
          <Image source={textLogo} style={styles.textLogo} />
        </View>

        <View style={styles.form}>
          { error ? <Text style={styles.error}> { error } </Text> : null }
          <TextInput style={styles.input} placeholder="Email" autoCompleteType="email" autoCapitalize="none"
           returnKeyType="next" value={email} onChangeText={email => this.setState({ email })} onSubmitEditing={onEmailSubmit} />
          <TextInput ref={component => this.passwordInput = component} value={password} onChangeText={password => this.setState({ password })}
           style={styles.input} placeholder="Senha" autoCompleteType="password" secureTextEntry={true} onSubmitEditing={onLoginButtonPress} />
        </View>

        <View style={styles.buttonsView}>
          <LoginButton onPress={onLoginButtonPress} />
          <Image source={or} style={styles.or} />
          <RegisterButton onPress={onRegisterButtonPress} />
        </View>

        { finishModalOpen ? <FinishModal terms={terms} isRegister={isRegister} onModalClose={onFinishModalClose} onFinishModalButtonPress={onFinishModalButtonPress} /> : null }
        { loginModalOpen ? <LoggingModal /> : null }
      </View>
    );
  }
}

export default connect()(FirstScreen);