import React, { Component } from 'react';
import { View, ScrollView, Image, ImageBackground, Text, TextInput, TouchableOpacity, StatusBar, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { AdMobRewarded } from 'react-native-admob';
import * as Animatable from 'react-native-animatable';
import OneSignal from 'react-native-onesignal';

import Modal from '../../components/Modal';
import TicketInfo from '../../components/TicketInfo';
import FallingAnimation from './FallingAnimation';

import colors from '../../configs/colors';
import apiUrl from '../../configs/apiUrl';
import styles from './styles';

import { setUserData, setProfileSentence } from '../../store/actions/users';

import differenceBetweenTwoDates from '../../utils/differenceBetweenTwoDates';
import getRandomProfileSentence from '../../utils/getRandomProfileSentence';
import { createTicket } from '../../utils/ticketRequests';

import little from '../../img/little.png';
import textLogo from '../../img/text-logo.png';
import participateButtonImage from '../../img/participate-button.png';


const Timer = ({ finish, atualDate }) => {
  finish = new Date(finish);
  const timerDate = new Date(finish.getFullYear(), finish.getMonth(), finish.getDate(), finish.getHours() + 3, finish.getMinutes(), finish.getSeconds());
  const { days, hours, minutes, seconds, available } = differenceBetweenTwoDates(timerDate, atualDate);

  return (
    <View style={styles.timer}>
      <View style={styles.timerTime}>
        { available ? <Text style={styles.timerTimeText}>{days}:{hours}:{minutes}:{seconds}</Text> : null }
        { !available ? <Text style={styles.timerTimeText}>00:00:00:00</Text> : null }
      </View>

      <View style={[styles.timerAvailable, available ? { backgroundColor: colors.green } : { backgroundColor: colors.red }]}>
      </View>
    </View>
  )
};

const PrincipalInfo = ({ text }) => (
  <ImageBackground source={principalInfoImage} style={styles.principalInfo}>
    <Text style={styles.principalInfoText}>{text}</Text>
  </ImageBackground>
);

const AboutModal = ({ reward, onModalClose }) => (
  <Modal onModalClose={onModalClose}>
    <Text style={styles.aboutModalTitle}>{reward.title}</Text>
    <Text style={styles.aboutModalDescription}>{reward.description}</Text>
  </Modal>
);

const TutorialModal = ({ onModalClose }) => (
  <Modal style={styles.tutorialModal}>
    <ScrollView style={styles.tutorialModalScrollView} contentContainerStyle={styles.tutorialModalContent}>
      <Image source={textLogo} style={styles.textLogo} />
      <Text style={styles.tutorialModalWelcome}>Seja Bem-Vindo ao Rifas BR!</Text>
      <Text style={styles.tutorialModalText}>Bem-Vindo! Aqui no Aplicativo você vai concorrer a um Prêmio Especial. Para entrar no Sorteio dele, clique no botão "Participar" e irá passar um Anúncio, que você deve Assistir por Inteiro para Ganhar um Cupom.</Text>
      <Text style={styles.tutorialModalText}>No canto Superior Direito, Você pode ver a Quantidade de Cupons que Você tem e a Máxima que Você pode Ter.</Text>
      <Text style={styles.tutorialModalText}>Deslizando o dedo para a Esquerda, você pode ter acesso as Missões, que Você pode Aumentar sua Quantidade Máxima de Cupons, Já Iniciar com Cupons no Próximo Sorteio e Ganhar Mais Cupons do que o Máximo Possível.</Text>
      <Text style={styles.tutorialModalText}>Deslizando o dedo para a Direita, você pode ter acesso aos dados do seu Perfil, uma boa Frase e poder Sair da sua Conta.</Text>
      <Text style={styles.tutorialModalText}>Quando Acabar o Tempo do Sorteio, a Cor do Cronômetro ficará vermelha e o Vencedor será decidido em até três horas e você será Notificado se Ganhou ou se Perdeu. Então, Acho que é isso, Boa Sorte! =)</Text>
      <TouchableOpacity onPress={onModalClose} style={styles.tutorialModalButton}>
        <Text style={styles.tutorialModalTextButton}>Entendi!</Text>
      </TouchableOpacity>
    </ScrollView>
  </Modal>
);

const ParticipateButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={participateButtonImage} style={styles.participateButton} />
  </TouchableOpacity>
);

class Principal extends Component {
  state = {
    atualDate: new Date(),
    isRaining: false,
    rewarded: false,
    isModalOpen: false,
    isTutorialModalOpen: false
  };

  componentDidMount() {
    setInterval(this.setAtualDate, 1000);
    OneSignal.init('7e983dce-74e9-42e0-b8ff-407eb128fd49');
    this.setAdmobInfo();
    this.verifyTutorial();
  }

  componentWillUmount() {
    AdMobRewarded.removeAllListeners();
  }

  setAdmobInfo = () => {
    AdMobRewarded.setAdUnitID('ca-app-pub-2325071240790429/1138582777');    

    AdMobRewarded.requestAd();

    AdMobRewarded.addEventListener('rewarded', () => this.setState({ rewarded: true }));
    AdMobRewarded.addEventListener('adClosed', () => {
      AdMobRewarded.requestAd();
      if(this.state.rewarded)
        this.onAdmobRewarded();
    });
  }

  verifyTutorial = async () => {
    try {
      const isTutorialComplete = await AsyncStorage.getItem('tutorialCompleted');
      
      if(!isTutorialComplete)
        this.setState({ isTutorialModalOpen: true });
    } catch(error) {
      console.log(error);
    }
  }

  setAtualDate = () => {
    this.setState({ atualDate: new Date() });
  }

  onAdmobRewarded = async () => {
    const { user } = this.props;

    this.setState({ rewarded: false });

    try {
      const newUserData = await createTicket(this.props.token);

      ToastAndroid.show('Você ganhou um Cupom para Participar!', ToastAndroid.SHORT);

      this.props.dispatch(setProfileSentence(getRandomProfileSentence()));
      this.props.dispatch(setUserData(newUserData));

      if(newUserData.missionUnlocked)
        ToastAndroid.show(`A Missão ${newUserData.missionUnlocked} foi Completada!`, ToastAndroid.SHORT);

      this.setRaining();
    } catch(error) {
      if(user.tickets != user.maxTickets)
        ToastAndroid.show('Erro ao Obter Cupom para Participar. Tente Novamente.', ToastAndroid.SHORT);
    }
  }

  setRaining = () => {
    this.setState({ isRaining: true });
    setTimeout(() => this.setState({ isRaining: false }), 3000);
  }

  showRewarded  = async() => {
    const finish = new Date(this.props.raffle.finish.replace(' ', 'T'));
    const atualDate = new Date();
    
    const finishDate = new Date(finish.getFullYear(), finish.getMonth(), finish.getDate(), finish.getHours() + 3, finish.getMinutes(), finish.getSeconds());    
    
    const { available } = differenceBetweenTwoDates(finishDate, atualDate);
    const { user } = this.props;

    if(!available)
      return ToastAndroid.show('O Tempo para Participar do Sorteio já Acabou.', ToastAndroid.SHORT);

    if(user.maxTickets == user.tickets)
      return ToastAndroid.show('Você Alcançou o Número Máximo de Cupons', ToastAndroid.SHORT);

    try {
      await AdMobRewarded.showAd();
    } catch(error) {
      ToastAndroid.show('Erro ao Obter Anúncio. Tente Novamente.', ToastAndroid.SHORT);
    } 
  }

  onMoreDetailPress = () => this.setState({ isModalOpen: true });
  onMoreDetailClose = () => this.setState({ isModalOpen: false });
  
  onTutorialModalClose = async () => {
    try {
      await AsyncStorage.setItem('tutorialCompleted', 'true');
      this.setState({ isTutorialModalOpen: false });
    } catch(error) {
      ToastAndroid.show('Erro ao Começar. Tente Novamente.', ToastAndroid.SHORT);
    }
  }

  render() {
    const { atualDate, isRaining, isModalOpen, isTutorialModalOpen } = this.state;
    const { user, raffle } = this.props;

    raffle.finish = raffle.finish.replace(' ', 'T');

    return (
      <View style={styles.principal}>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />

        { isRaining ? FallingAnimation() : false }

        <View>
          <Image source={textLogo} style={styles.textLogo} />
        </View>

        <View style={styles.littleView}>
          <Text style={styles.littleText}>{user.tickets}/{user.maxTickets}</Text>
          <Image source={little} style={styles.little} />
        </View>

        <View style={styles.main}>
          <View style={styles.timerView}>
            <Timer finish={raffle.finish} atualDate={atualDate} />
          </View>

          <View style={styles.principalView}>
            <View style={[styles.principalView, styles.principalInfos]}>
              <Image source={{ uri: `${apiUrl}/upload/raffles/${raffle.img}` }} style={styles.principalImage} />
              <TicketInfo text={raffle.title} />
              { !raffle.description ? <TicketInfo text={`R$${Number(raffle.value).toFixed(2).replace('.', ',')}`} /> : null }
              { raffle.description ? <TouchableOpacity onPress={this.onMoreDetailPress}><TicketInfo text="Ver Detalhes" /></TouchableOpacity> : null }
            </View>
          </View>


          <Animatable.View animation="pulse" duration={8000} easing="ease-out" iterationCount="infinite" style={styles.principalView}>
            <ParticipateButton onPress={this.showRewarded} />
          </Animatable.View>
        </View>

        { isModalOpen ? <AboutModal reward={raffle} onModalClose={this.onMoreDetailClose} /> : false }
        { isTutorialModalOpen ? <TutorialModal onModalClose={this.onTutorialModalClose} /> : null }
      </View>
    );
  }
}

export default connect(state => ({ user: state.users.user, raffle: state.users.raffle, token: state.users.token }))(Principal);