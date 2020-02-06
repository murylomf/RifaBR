import colors from '../../configs/colors';

const styles = {
  missions: {
  	flex: 1,
  	backgroundColor: colors.background,
    alignItems: 'center',
  },

  textLogo: {
    width: '40%',
    height: undefined,
    aspectRatio: 1280/750,
    margin: 12
  },

  missionView: {
  	width: '90%',
  	marginVertical: 8
  },

  mission: {
  	width: '100%',
    height: undefined,
    aspectRatio: 1280/260,
    alignItems: 'center',
    justifyContent: 'center'  	
  },

  missionText: {
  	color: 'white',
  	fontFamily: 'Staatliches-Regular',
  	fontSize: 28
  },

  missionInfo: {
  	position: 'absolute',
  	right: 12
  },

  infoTitle: {
    color: 'white',
    fontSize: 26,
    margin: 4,
    fontFamily: 'Staatliches-Regular'
  },

  infoText: {
    color: 'white',
    textAlign: 'justify',
    fontFamily: 'Raleway-Regular'
  }     
};

export default styles;