import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, StatusBar, ToastAndroid } from 'react-native';
import { AdMobRewarded } from 'react-native-admob';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { connect } from 'react-redux';

import Modal from '../../components/Modal';

import textLogo from '../../img/text-logo.png';
import missionRed from '../../img/mission-red.png';
import missionYellow from '../../img/mission-yellow.png';
import missionGreen from '../../img/mission-green.png';

import { setUserData } from '../../store/actions/users';

import { createMoreTicket } from '../../utils/ticketRequests';
import differenceBetweenTwoDates from '../../utils/differenceBetweenTwoDates';

import colors from '../../configs/colors';
import styles from './styles';

const methods = {
  completed: missionGreen,
  waiting: missionYellow,
  notCompleted: missionRed
};

const InfoModal = ({ info, onModalClose }) => (
  <Modal onModalClose={onModalClose}>
    <Text style={styles.infoTitle}>{info.title}</Text>
    <Text style={styles.infoText}>{info.text}</Text>
  </Modal>
);

const Mission = ({ title, onMissionPress, method, text, onInfoPress }) => {
  if(onMissionPress)
  	return (
      <TouchableOpacity onPress={onMissionPress} style={styles.missionView}>
        <ImageBackground source={methods[method]} style={styles.mission}>
        <Text style={styles.missionText}>{title}</Text>
        <TouchableOpacity onPress={() => onInfoPress({title, text})} style={styles.missionInfo}>
          <Icon name="info" size={24} color="white" />
        </TouchableOpacity>
      </ImageBackground>
    </TouchableOpacity>
    );

  return (
  <View style={styles.missionView}>
    <ImageBackground source={methods[method]} style={styles.mission}>
      <Text style={styles.missionText}>{title}</Text>
      <TouchableOpacity onPress={() => onInfoPress({title, text})} style={styles.missionInfo}>
        <Icon name="info" size={24} color="white" />
      </TouchableOpacity>
    </ImageBackground>
  </View> 
  );    
};

class Missions extends Component {
  state = {
  	infoSelected: {},
    rewarded: false
  }

  componentDidMount() {
    this.setAdmobInfo();
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

  onInfoPress = infoSelected => this.setState({ infoSelected });
  onModalClose = () => this.setState({ infoSelected: {} });

  onAdmobRewarded = async () => {
    const { user } = this.props;
    this.setState({ rewarded: false });

    try {
      const newUserData = await createMoreTicket(this.props.token);
      ToastAndroid.show('Você ganhou Dois Cupons para Participar!', ToastAndroid.SHORT);
      this.props.dispatch(setUserData(newUserData));
    } catch(error) {
      if(user.tickets == 30)
        ToastAndroid.show('Erro ao Obter Cupom para Participar. Tente Novamente.', ToastAndroid.SHORT);
    }
  }
  
  getUserWasCompletedMoreAndMore = () => {
    const { user } = this.props;

    let wasUserCompletedMoreAndMore = user.tickets == 30 ? "completed" : "notCompleted";

    if(wasUserCompletedMoreAndMore === 'completed' && user.lastMoreAndMore) {
      const atualDate = new Date();
      const lastMoreAndMoreDate = new Date(user.lastMoreAndMore.replace(' ', 'T'));
      const differenceInMsBetweenLastMoreAndMoreAndToday = atualDate.getTime() - lastMoreAndMoreDate.getTime();
      const differenceInHoursBetweenLastMoreAndMoreAndToday = Math.abs(differenceInMsBetweenLastMoreAndMoreAndToday) / 36e5;
      
      wasUserCompletedMoreAndMore = differenceInHoursBetweenLastMoreAndMoreAndToday >= 24 ? "completed" : "waiting";
    }

    return wasUserCompletedMoreAndMore;
  }

  onMoreAndMorePress = async () => {
    const finishDate = new Date(this.props.raffle.finish.replace(' ', 'T'));
    const atualDate = new Date();
    const { available } = differenceBetweenTwoDates(finishDate, atualDate);
    const wasUserCompletedMoreAndMore = this.getUserWasCompletedMoreAndMore();

    if(!available)
      return ToastAndroid.show('O Tempo para Participar do Sorteio já Acabou.', ToastAndroid.SHORT);

    if(wasUserCompletedMoreAndMore === 'notCompleted')
      return ToastAndroid.show('Complete a Missão Primeiro!', ToastAndroid.SHORT);

    if(wasUserCompletedMoreAndMore === 'waiting')
      return ToastAndroid.show('Espere se Passar as 24h para Retirar Novamente!', ToastAndroid.SHORT);

    try {
      await AdMobRewarded.showAd();
    } catch(error) {
      ToastAndroid.show('Erro ao Obter Anúncio. Tente Novamente.', ToastAndroid.SHORT);
    } 
  }

  render() {
  	const { onInfoPress, onMoreAndMorePress, onModalClose } = this;
  	const { infoSelected } = this.state;
    const { user } = this.props;

    const wasUserCompletedMoreSpace = user.maxTickets > 20 ? "completed" : "notCompleted";
    const wasUserCompletedYourHonor = Number(user.ticketsInNextRound) > 0 ? "completed" : "notCompleted";
    const wasUserCompletedMoreAndMore = this.getUserWasCompletedMoreAndMore();

  	return (
  	  <View style={styles.missions}>
  	    <StatusBar backgroundColor={colors.background} barStyle="light-content" />

        <View>
          <Image source={textLogo} style={styles.textLogo} />
        </View>

        <Mission title="Mais Espaço" text="Pegue 20 Cupons e Aumente em 10 o seu Limite de Cups!" method={wasUserCompletedMoreSpace} onInfoPress={onInfoPress} />
        <Mission title="Sua Honra" text="Pegue 25 Cupons e no Próximo Sorteio ganhe grátis 5 Cupons!" method={wasUserCompletedYourHonor} onInfoPress={onInfoPress} />  
        <Mission title="Mais e Mais" onMissionPress={onMoreAndMorePress} text="Pegue 30 Cupons e a cada 24 Horas, quando o 'Mais e Mais' ficar Verde, clique nele e ganhe 2 Cupons assistindo o Anúncio!" method={wasUserCompletedMoreAndMore} onInfoPress={onInfoPress} />

        { infoSelected.title ? <InfoModal info={infoSelected} onModalClose={onModalClose} /> : null }   
  	  </View>
  	);
  }
}

export default connect(state => ({ user: state.users.user, raffle: state.users.raffle, token: state.users.token }))(Missions);