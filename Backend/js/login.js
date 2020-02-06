const form = document.querySelector('form');

function doLogin({ email, password }) {
  const body = JSON.stringify({ email, password });

  return new Promise(async (next, reject) => {
    try {
      const call = await fetch('./php/admin-login.php', {
        method: 'POST',
        body
      });
      const response = await call.json();

      if(response.error)
        return reject(response.error);

      next();
    } catch(error) {
      reject('Erro Desconhecido ao Entrar');
    }
  });
}

async function onLoginSubmit(event) {
  event.preventDefault();

  const email = document.querySelector('#email-input').value;
  const password = document.querySelector('#password-input').value;

  clearError();
  setLoadingButton('Entrando..');

  try {
    await doLogin({ email, password });
    window.location.href = './index.php';
  } catch(error) {
    setLoadingButtonToNormal('Entrar');
    setError(error);
  }
}

form.addEventListener('submit', onLoginSubmit);