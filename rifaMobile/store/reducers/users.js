import { Alert } from 'react-native';

const INITIAL_STATE = {
  user: {},
  raffle: {},
  profileSentence: 'Se Você está Usando esse Aplicativo, é um Sinal Positivo que Você Ainda não Perdeu as Esperanças',
  token: null
};

function reducer(state = INITIAL_STATE, action) {
  if(action.type === 'SET_USER_DATA') 
  	state = {...state, user: action.user, raffle: action.user.raffle || state.raffle};

  if(action.type === 'SET_TOKEN')
  	state = {...state, token: action.token};

  if(action.type === 'SET_PROFILE_SENTENCE')
  	state = {...state, profileSentence: action.profileSentence};

  return state; 
}

export default reducer;