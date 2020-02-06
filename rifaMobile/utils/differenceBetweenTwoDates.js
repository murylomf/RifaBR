function differenceBetweenTwoDates(finish, atualDate) {
  const dateFuture = finish.getTime();
  const dateNow = atualDate.getTime();

  let seconds = Math.floor((dateFuture - (dateNow))/1000);
  let minutes = Math.floor(seconds/60);
  let hours = Math.floor(minutes/60);
  let days = Math.floor(hours/24);

  hours = hours-(days*24);
  minutes = minutes-(days*24*60)-(hours*60);
  seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

  if(days.toString().length === 1) days = `0${days}`;
  if(hours.toString().length === 1) hours = `0${hours}`;
  if(minutes.toString().length === 1) minutes = `0${minutes}`;
  if(seconds.toString().length === 1) seconds = `0${seconds}`;

  return { days, hours, minutes, seconds, available: (dateFuture - dateNow) > 0 ? true : false };
}

export default differenceBetweenTwoDates;