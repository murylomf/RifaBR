import colors from '../../configs/colors';

const styles = {
  principal: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  textLogo: {
    width: '40%',
    height: undefined,
    aspectRatio: 1280/750,
    margin: 12
  },

  main: {
    flex: 1,
    justifyContent: 'space-between'
  },

  timerView: {
    margin: 16,
    width: '100%'
  },

  littleView: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  littleText: {
    color: 'white',
    fontFamily: 'Staatliches-Regular',
    fontSize: 24,
    marginRight: 8
  },

  little: {
    width: 14,
    height: undefined,
    aspectRatio: 55/89
  },

  timer: {
    width: '95%',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12
  },

  timerTime: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  timerTimeText: {
    fontFamily: 'Staatliches-Regular',
    color: 'gray',
    fontSize: 42,
    padding: 8
  },

  timerAvailable: {
    width: 40,
    height: '100%',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12
  },

  principalImage: {
    width: '50%',
    height: undefined,
    aspectRatio: 1
  },

  participateButton: {
    width: '80%',
    height: undefined,
    aspectRatio: 1280/267,
    margin: 24
  },

  principalView: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  principalInfos: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',    
  },

  aboutModalTitle: {
    color: 'white',
    fontSize: 26,
    margin: 4,
    fontFamily: 'Staatliches-Regular'
  },

  aboutModalDescription: {
    color: 'white',
    textAlign: 'justify',
    fontFamily: 'Raleway-Regular'
  },

  tutorialModal: {
    maxHeight: '85%'
  },

  tutorialModalContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  tutorialModalWelcome: {
    fontFamily: 'Staatliches-Regular',
    color: 'white',
    fontSize: 18
  },

  tutorialModalText: {
    fontFamily: 'Raleway-Regular',
    color: 'white',
    textAlign: 'justify',
    fontSize: 12,
    margin: 8
  },

  tutorialModalButton: {
    backgroundColor: colors.red,
    width: '100%',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    margin: 8
  },

  tutorialModalTextButton: {
    color: 'white',
    fontFamily: 'Staatliches-Regular',
    fontSize: 18
  }
}

export default styles;