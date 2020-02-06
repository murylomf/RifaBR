const aside = document.querySelector('#aside-elements');
const newButton = document.querySelector('#new-button');

const raffleForm = document.querySelector('#raffle-form');
const raffleImg = document.querySelector('section form img');
const raffleImageFile = document.querySelector('input[type="file"]');
const raffleTitle = document.querySelector('#raffle-title');
const raffleValue = document.querySelector('#raffle-value');
const raffleDescription = document.querySelector('#raffle-description');
const raffleDate = document.querySelector('#raffle-date');
const raffleHour = document.querySelector('#raffle-hour');
const raffleSubmit = document.querySelector('#raffle-submit');

const notificationForm = document.querySelector('#notification-form');
const notificationTitle = document.querySelector('#notification-title');
const notificationMessage = document.querySelector('#notification-message');

const termsForm = document.querySelector('#terms-form');
const termsText = document.querySelector('#terms-text');

const showWinnerButton = document.querySelector('#show-winner-button');
const sendNotifyButton = document.querySelector('#send-notify-button');
const deleteButton = document.querySelector('#delete-button');
const termsButton = document.querySelector('#terms-button');

const winnerCloseModal = document.querySelector('#winner-close-modal');
const notificationCloseModal = document.querySelector('#notification-close-modal');
const termsCloseModal = document.querySelector('#terms-close-modal');

VMasker(raffleDate).maskPattern('99/99/9999');
VMasker(raffleHour).maskPattern('99:99:99');

let selectedRaffle = {};

function getFinishDate(finish) {
  const date = new Date(finish);
  let dateText = '';

  if(date.getDate().toString().length === 1)
  	dateText += `0${date.getDate()}/`;
  else
  	dateText += `${date.getDate()}/`;

  if((date.getMonth() + 1).toString().length === 1)
  	dateText += `0${date.getMonth() + 1}/`;
  else
  	dateText += `${date.getMonth() + 1}/`;

  dateText += date.getFullYear();

  return dateText;  
}

function setRaffle(raffle) {
  let finishDate = '', finishHour = '';

  if(raffle.finish) {
    finishDate = getFinishDate(raffle.finish);
    finishHour = raffle.finish.split(' ')[1];
  }

  raffleImg.src = `./upload/raffles/${raffle.img}`;
  raffleTitle.value = raffle.title;
  raffleValue.value = raffle.value;
  raffleDescription.value = raffle.description;
  raffleDate.value = finishDate;
  raffleHour.value = finishHour;

  raffleSubmit.style['display'] = 'block';
  deleteButton.style['display'] = 'none';

  if(raffle.title === 'Dinheiro') {
  	raffleValue.style['display'] = 'block';
  	raffleDescription.style['display'] = 'none';
  } else {
  	raffleValue.style['display'] = 'none';
  	raffleDescription.style['display'] = 'block';  	
  }

  if(!raffle.title)
  	raffleDescription.style['display'] = 'none';

  if(raffle.winner)
  	showWinnerButton.style['display'] = 'block';
  else
  	showWinnerButton.style['display'] = 'none';

  if(raffle.winner)
    raffleSubmit.style['display'] = 'none';

  if(raffle.id !== undefined)  {
    const atualDate = new Date();
    const finishDate = new Date(raffle.finish);
    const differenceBetweenTodayAndFinishDate = finishDate - atualDate.getTime();

    deleteButton.style['display'] = 'block';

    if(differenceBetweenTodayAndFinishDate < 0) {
      raffleSubmit.value = 'Sortear';
    } else {
  	  raffleSubmit.value = 'Modificar';
      
      const exceedMaximumMs = 60*60*24 < differenceBetweenTodayAndFinishDate;

      if(!exceedMaximumMs)
        setTimeout(() => setRaffle(raffle), differenceBetweenTodayAndFinishDate);
    }
  } else {
  	raffleSubmit.value = 'Criar';
  }
}

function cleanAsideList() {
  aside.innerHTML = '';
}

function cleanAsideItems() {
  const asideItems = document.querySelectorAll('aside div');
  asideItems.forEach(asideItem => asideItem.classList.remove('selected'));
}

function createAsideItem(raffle) {
  const asideItem = document.createElement('div');
  const titleElement = document.createElement('h3');
  const descriptionElement = document.createElement('p');
  const raffleDid = document.createElement('i');

  raffleDid.classList.add('material-icons');

  raffleDid.innerText = 'check';
  titleElement.innerText = raffle.title;
  descriptionElement.innerText = raffle.description || numeral(raffle.value).format('$0,0.00');

  asideItem.onclick = () => {
  	cleanAsideItems();
  	asideItem.classList.add('selected');
  	selectedRaffle = raffle;
  	setRaffle(selectedRaffle);
  }

  asideItem.appendChild(titleElement);
  asideItem.appendChild(descriptionElement);

  if(raffle.winner)
  	asideItem.appendChild(raffleDid);

  aside.appendChild(asideItem);
}

function createAsideItems() {
  raffles.forEach(createAsideItem);
}

newButton.onclick = () => {
  cleanAsideItems();
  newButton.classList.add('selected');
  selectedRaffle = { img: 'none-img.png', title: '', value: '', description: '', finish: '' };
  setRaffle(selectedRaffle);
}

raffleTitle.onkeyup = () => {
  const title = raffleTitle.value;

  if(title === 'Dinheiro') {
  	raffleValue.style['display'] = 'block';
  	raffleDescription.style['display'] = 'none';
  } else {
  	raffleValue.style['display'] = 'none';
  	raffleDescription.style['display'] = 'block';  	
  }

  if(!title)
  	raffleDescription.style['display'] = 'none';
}

function showWinnerModal() {
  const email = document.querySelector('#winner-modal b');
  email.innerText = selectedRaffle.winner.email;

  openModal('#winner-modal');
}

async function onFormSubmit(event) {
  event.preventDefault();
  
  const parts = raffleDate.value.split('/');
  const finish = `${parts[2]}/${parts[1]}/${parts[0]} ${raffleHour.value}`;

  const body = {
    title: raffleTitle.value,
    value: raffleValue.value,
    description: raffleDescription.value,
    finish,
    img: raffleImageFile.files[0]
  };

  if(raffleSubmit.value === 'Modificar')
    setLoadingButton('Modificando..', '#raffle-submit');
  else if (raffleSubmit.value === 'Criar')
    setLoadingButton('Criando..', '#raffle-submit');
  else
    setLoadingButton('Sorteando..', '#raffle-submit');

  try {
    if(raffleSubmit.value === 'Modificando..') {
      const raffle = await modifyRaffle({...body, id: selectedRaffle.id});
      
      raffles = raffles.map(raffleMap => {
        if(raffleMap.id === selectedRaffle.id)
          raffleMap = raffle;
        return raffleMap;
      });

      alert('Modificado com Sucesso!');
      setLoadingButtonToNormal('Modificar', '#raffle-submit');
      setRaffle(raffle);
    }

    if(raffleSubmit.value === 'Criando..') {
      if(!raffleImageFile.files[0])
        return alert('Insira a Imagem da Rifa');

      const raffle = await createRaffle(body);

      raffleTitle.value = '';
      raffleValue.value = '';
      raffleDescription.value = '';
      raffleDate.value = '';
      raffleHour.value = '';
      raffleImg.src = './upload/raffles/none-img.png';
      raffleImageFile.files[0] = null;

      setLoadingButtonToNormal('Criar', '#raffle-submit');

      raffles.unshift(raffle);
    }

    if(raffleSubmit.value === 'Sorteando..') {
      const raffle = await initRaffle(selectedRaffle.id);
      selectedRaffle = raffle;

      raffles = raffles.map(raffleMap => {
        if(raffleMap.id === selectedRaffle.id)
          raffleMap = raffle;
        return raffleMap;
      });      

      await sendWinnerNotification(raffle.winner.email);
      await sendLosersNotification(raffle.winner.email);

      setRaffle(raffle);
      setLoadingButtonToNormal('Sortear', '#raffle-submit');
      showWinnerModal();
    }

    cleanAsideList();
    createAsideItems();
  } catch(error) {
    alert(error);
  }
}

function onImgClick(event) {
  raffleImageFile.click();
}

function setRaffleImg(event) {
  const file = event.target.files[0];

  if(!file)
    return;

  const reader  = new FileReader();
  reader.onload = e => raffleImg.src = e.target.result;
  reader.readAsDataURL(file);
}

async function onNotificationFormSubmit(event) {
  event.preventDefault();

  const title = notificationTitle.value;
  const message = notificationMessage.value;

  setLoadingButton('Enviando..', '#notification-submit');

  try {
    await sendNotification({ title, message });

    notificationTitle.value = '';
    notificationMessage.value = '';

    setLoadingButtonToNormal('Enviar', '#notification-submit');
  } catch(error) {
    alert(error);
    setLoadingButtonToNormal('Enviar', '#notification-submit');
  }
}

async function onTermsFormSubmit(event) {
  event.preventDefault();

  const text = termsText.value;

  setLoadingButton('Modificando..', '#terms-submit');

  try {
    await updateTerms(text);
    setLoadingButtonToNormal('Modificar', '#terms-submit');
    alert('Termos Atualizados!');
  } catch(error) {
    alert(error);
  }
}

async function onDeleteButtonClick() {
  try {
    deleteButton.innerText = 'Deletando..';
    await deleteRaffle(selectedRaffle.id);
    deleteButton.innerText = 'Deletar';

    raffles = raffles.filter(raffle => raffle.id !== selectedRaffle.id);
    selectedRaffle = { img: 'none-img.png', title: '', value: '', description: '', finish: '' };
    
    setRaffle(selectedRaffle);

    cleanAsideList();
    createAsideItems();    
  } catch(error) {
    deleteButton.innerText = 'Deletar';
    alert(error);
  }
}

showWinnerButton.addEventListener('click', showWinnerModal);
deleteButton.addEventListener('click', onDeleteButtonClick);
sendNotifyButton.addEventListener('click', () => openModal('#notification-modal'));
termsButton.addEventListener('click', () => openModal('#terms-modal'));

winnerCloseModal.addEventListener('click', () => closeModal('#winner-modal'));
notificationCloseModal.addEventListener('click', () => closeModal('#notification-modal'));
termsCloseModal.addEventListener('click', () => closeModal('#terms-modal'));

raffleImageFile.addEventListener('change', setRaffleImg);
raffleImg.addEventListener('click', onImgClick);
raffleForm.addEventListener('submit', onFormSubmit);

notificationForm.addEventListener('submit', onNotificationFormSubmit);
termsForm.addEventListener('submit', onTermsFormSubmit);

createAsideItems();