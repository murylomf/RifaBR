function setUserData(user) {
  return {
    type: 'SET_USER_DATA',
    user
  }
}

function setToken(token) {
  return {
  	type: 'SET_TOKEN',
  	token
  }
}

function setProfileSentence(profileSentence) {
  return {
  	type: 'SET_PROFILE_SENTENCE',
  	profileSentence
  }
}

export { setUserData, setToken, setProfileSentence };