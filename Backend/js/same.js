function clearError(errorQuery = '.error') {
  const error = document.querySelector(errorQuery);
  error.innerHTML = '';	
}

function setError(errorMessage, errorQuery = '.error') {
  const error = document.querySelector(errorQuery);
  error.innerText = errorMessage;
}

function setLoadingButton(text, loadingButtonQuery = 'input[type="submit"]') {
  const button = document.querySelector(loadingButtonQuery);
  button.value = text;
  button.disabled = true;
}

function setLoadingButtonToNormal(text, loadingButtonQuery = 'input[type="submit"]') {
  const button = document.querySelector(loadingButtonQuery);
  button.value = text;
  button.disabled = false; 
}