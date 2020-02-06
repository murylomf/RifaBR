import colors from '../../configs/colors';

const styles = {
  profile: {
  	flex: 1,
  	backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  textLogo: {
    width: '40%',
    height: undefined,
    aspectRatio: 1280/750,
    margin: 12
  },

  userInfoView: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sentenceView: {
    width: '90%',
    margin: 12,
    borderRadius: 16,
    backgroundColor: '#101010'
  },

  sentence: {
    padding: 24,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Raleway-Regular'
  },

  exitView: { 
    width: '90%',
    margin: 12,
  },

  exitText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Staatliches-Regular',
    fontSize: 20
  }       
};

export default styles;