function updateTerms(terms) {
  return new Promise(async (next, reject) => {
    const body = JSON.stringify({ terms });

    try {
      const call = await fetch(`./php/update-terms.php`, {
        method: 'PUT',
        body
      });

      const response = await call.json();

      if(response.error)
        reject(response.error);

      next(response);
    } catch(error) {
      console.log(error);
      reject('Erro Desconhecido ao Atualizar Termos');     
    }
  });
}

function createRaffle({ title, value, description, finish, img }) {
  return new Promise(async (next, reject) => {
    const body = new FormData();

    body.append('title', title);
    body.append('value', value);
    body.append('description', description);
    body.append('finish', finish);
    body.append('img', img);

    try {
      const call = await fetch(`./php/create-raffle.php`, {
        method: 'POST',
        body
      });

      const response = await call.json();

      if(response.error)
        reject(response.error);

      next(response);
    } catch(error) {
      console.log(error);
      reject('Erro Desconhecido ao Criar Rifa');
    }
  });
}

function modifyRaffle({ title, value, description, finish, img, id }) {
  return new Promise(async (next, reject) => {
    const body = new FormData();

    body.append('id', id);
    body.append('title', title);
    body.append('value', value);
    body.append('description', description);
    body.append('finish', finish);
    body.append('img', img);

    try {
      const call = await fetch(`./php/modify-raffle.php`, {
        method: 'POST',
        body
      });

      const response = await call.json();

      if(response.error)
        reject(response.error);

      next(response);
    } catch(error) {
      console.log(error);
      reject('Erro Desconhecido ao Modificar Rifa');
    }
  });
}

function deleteRaffle(id) {
  return new Promise(async (next, reject) => {
    const body = JSON.stringify({ id });

    try {
      const call = await fetch(`./php/delete-raffle.php`, {
        method: 'DELETE',
        body
      });

      const response = await call.json();

      if(response.error)
        reject(response.error);

      next(response);
    } catch(error) {
      console.log(error);
      reject('Erro Desconhecido ao Deletar Rifa');     
    }
  });
}


function initRaffle(id) {
  return new Promise(async (next, reject) => {
    let body = {
      id
    };

    body = JSON.stringify(body);
    
    try {
      const call = await fetch(`./php/init-raffle.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      });

      const response = await call.json();

      next(response);
    } catch(error) {
      console.log(error);
      reject('Erro Desconhecido ao Sortear');
    }
  });  
}

//  Notifications

function sendNotification({ title, message }) {
  return new Promise(async (next, reject) => {
    let body = {
      app_id: '7e983dce-74e9-42e0-b8ff-407eb128fd49',
      included_segments: ['Active Users', 'Inactive Users'],
      headings: {
        en: title,
        pt: title
       },
      contents: {
         en: message,
         pt: message
      },
      small_icon: 'ic_logo',
      android_accent_color: '7CB342FF'
    };

    body = JSON.stringify(body);
    
    try {
      const call = await fetch(`https://onesignal.com/api/v1/notifications/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic MDZjM2YwNDgtMzgyNC00NGJmLTk3MTctZDQ2NDFiZDA3ZTY1'
        },
        body
      });

      const response = await call.json();

      next(response);
    } catch(error) {
      console.log(error);
      reject('Erro Desconhecido ao Enviar Mensagem');
    }
  });
}

function sendWinnerNotification(email) {
  return new Promise(async (next, reject) => {
    let body = {
      app_id: '7e983dce-74e9-42e0-b8ff-407eb128fd49',
      headings: {
        en: 'Resultado do Sorteio',
        pt: 'Resultado do Sorteio'
       },
      contents: {
         en: 'Parabéns! Você acabou de ganhar o sorteio do Rifas BR. Em até 72 horas enviaremos uma mensagem para você através do seu Email! Aguarde..',
         pt: 'Parabéns! Você acabou de ganhar o sorteio do Rifas BR. Em até 72 horas enviaremos uma mensagem para você através do seu Email! Aguarde..'
      },
      filters: [
        { field: 'tag', key: 'email', relation: '=', value: email }
      ],
      small_icon: 'ic_logo',
      android_accent_color: '7CB342FF'
    };

    body = JSON.stringify(body);
    
    try {
      const call = await fetch(`https://onesignal.com/api/v1/notifications/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic MDZjM2YwNDgtMzgyNC00NGJmLTk3MTctZDQ2NDFiZDA3ZTY1'
        },
        body
      });

      const response = await call.json();

      next(response);
    } catch(error) {
      console.log(error);
      reject('Erro Desconhecido ao Enviar Notificação do Vencedor');
    }
  });
}

function sendLosersNotification(winnerEmail) {
  let winnerEmailFirstFourLetters = winnerEmail.substring(0, 4);

  for(let i = 0; i < winnerEmail.length - 4; i++)
    winnerEmailFirstFourLetters += '*';

  const winnerEmailEncoded = winnerEmailFirstFourLetters;

  return new Promise(async (next, reject) => {
    let body = {
      app_id: '7e983dce-74e9-42e0-b8ff-407eb128fd49',
      headings: {
        en: 'Resultado do Sorteio',
        pt: 'Resultado do Sorteio'
       },
      contents: {
         en: `Infelizmente não foi desta vez, mas continue assim, um dia você poderá ganhar. Email do Vencedor: ${winnerEmailEncoded}`,
         pt: `Infelizmente não foi desta vez, mas continue assim, um dia você poderá ganhar. Email do Vencedor: ${winnerEmailEncoded}` 
       },
      filters: [
        { field: 'tag', key: 'email', relation: '!=', value: winnerEmail }
      ],
      small_icon: 'ic_logo',
      android_accent_color: 'FF2A2AFF'
    };

    body = JSON.stringify(body);
    
    try {
      const call = await fetch(`https://onesignal.com/api/v1/notifications/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic MDZjM2YwNDgtMzgyNC00NGJmLTk3MTctZDQ2NDFiZDA3ZTY1'
        },
        body
      });

      const response = await call.json();

      next(response);
    } catch(error) {
      console.log(error);
      reject('Erro Desconhecido ao Enviar Notificação do Vencedor');
    }
  });
}