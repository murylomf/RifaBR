import {  Alert, ToastAndroid } from 'react-native';
import apiUrl from '../configs/apiUrl';

function login(email, password) {
  return new Promise(async (next, reject) => {
    const body = JSON.stringify({ email, password });

    try {
      const call = await fetch(`${apiUrl}/php/login-user.php`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body
      });
      
      const res = await call.json();

      console.log(res);

      if(res.error)
        return reject(res.error);
      
      next(res.token);
    } catch(error) {
      reject('Erro ao fazer Login');
    }
  });
}

function register(email, password) {
  return new Promise(async (next, reject) => {
    const body = JSON.stringify({ email, password });

    try {
      const call = await fetch(`${apiUrl}/php/register-user.php`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body
      });
      
      const res = await call.json();

      if(res.error)
        return reject(res.error);
      
      next(res.token);
    } catch(error) {
      reject('Erro ao Cadastrar');
    }
  });
}

function getUserData(token) {
  return new Promise(async (next, reject) => {
    try {
      const call = await fetch(`${apiUrl}/php/get-user-info.php`, {
        method: 'GET',
        headers: {
          "User-Token": token
        },
      });

      const res = await call.json();

      if(res.error)
        return reject(res.error);
      
      next(res);
    } catch(error) {
      ToastAndroid.show(error.toString(), ToastAndroid.LONG);
      reject('Erro ao fazer Login');
    }
  });
}

export { login, register, getUserData };