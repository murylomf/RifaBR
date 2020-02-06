import apiUrl from '../configs/apiUrl';

function getTerms() {
  return new Promise(async (next, reject) => {
    try {
      const call = await fetch(`${apiUrl}/php/get-terms.php`);
      
      const res = await call.json();

      if(res.error)
        return reject(res.error);
      
      next(res.term);
    } catch(error) {
      reject('Erro ao Obter Termos');
    }
  });
}

export { getTerms };