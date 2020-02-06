import apiUrl from '../configs/apiUrl';

function createTicket(token) {
  return new Promise(async (next, reject) => {
    try {
      const call = await fetch(`${apiUrl}/php/create-ticket.php`, {
        method: 'POST',
        headers: {
          'User-Token': token
        }
      });

      const res = await call.json();

      if(res.error)
        return reject(res.error);
      
      next(res);
    } catch(error) {
      reject('Erro ao Criar Cup');
    }
  });
}

function createMoreTicket(token) {
  return new Promise(async (next, reject) => {
    try {
      const call = await fetch(`${apiUrl}/php/create-more-ticket.php`, {
        method: 'POST',
        headers: {
          'User-Token': token
        }
      });

      const res = await call.json();

      if(res.error)
        return reject(res.error);
      
      next(res);
    } catch(error) {
      reject('Erro ao Criar Cup');
    }
  });  
}

export { createTicket, createMoreTicket };