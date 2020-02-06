import colors from '../../configs/colors';

const screenPadding = 24;

const styles = {
  firstScreen: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  textLogo: {
    width: '40%',
    height: undefined,
    aspectRatio: 1280/750,
    margin: screenPadding
  },

  form: {
  	width: '100%',
  	padding: screenPadding
  },

  error: {
  	fontFamily: 'Raleway-Regular',
  	color: 'white',
  	textAlign: 'center',
  	marginVertical: 12,
  	fontSize: 18
  },

  input: {
  	color: 'gray',
  	backgroundColor: 'white',
  	marginVertical: 8,
  	borderRadius: 12,
  	fontFamily: 'Raleway-Regular',
  	fontSize: 20,
  	paddingLeft: 12  	
  },

  buttonsView: {
  	alignItems: 'center',
  	marginVertical: screenPadding,
  },

  or: {
  	width: '100%',
  	height: undefined,
  	aspectRatio: 720/49,
  	marginVertical: 12,
  },

  button: {
    width: '60%',
    height: undefined,
    aspectRatio: 720/194
  },

  loadingModalText: {
    color: 'white',
    fontFamily: 'Staatliches-Regular',
    textAlign: 'center',
    fontSize: 22
  },

  termsTextarea: {
    backgroundColor: 'black',
    borderRadius: 12,
    padding: 8,
    margin: 8,
    height: 150,
  },

  termsTextareaText: {
    color: 'white',
    fontFamily: 'Raleway-Regular'
  },

  finishModalButton: {
    backgroundColor: colors.red,
    borderRadius: 12,
    margin: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },

  finishModalButtonText: {
    color: 'white',
    fontFamily: 'Staatliches-Regular',
    fontSize: 22
  },

  finishModalText: {
    color: 'white',
    fontFamily: 'Raleway-Regular',
    textAlign: 'center'
  }
}

export default styles;