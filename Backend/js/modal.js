function openModal(elementQuery) {
  const modal = document.querySelector(elementQuery);
  modal.style['display'] = 'flex';
}

function closeModal(elementQuery) {
  const modal = document.querySelector(elementQuery);
  modal.style['display'] = 'none';
}