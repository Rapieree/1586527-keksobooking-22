// decimalSign - Символов после запятой, 0 для целых чисел
const getRandomNumb = (min, max, decimalSign = 0) => { // Рандомное число в диапазоне
  if ((min < 0 || max < 0 || decimalSign < 0 || !Number.isInteger(decimalSign)) || Math.abs(min - max) === 0) {
    return;
  }
  if (decimalSign === 0 && !(Number.isInteger(min) && Number.isInteger(max))) {
    return;
  }
  let realMin = Math.min(min, max);
  let realMax = Math.max(min, max);
  let ratio = Math.pow(10, decimalSign);
  let random = realMin - 0.5 / ratio + Math.random() * (realMax - realMin + 1 / ratio);
  // модифицированный вариант с сайта https://learn.javascript.ru/task/random-int-min-max

  random = parseFloat(random.toFixed(decimalSign));
  return Number.isInteger(random) ? Math.round(random) : random;
}
export { getRandomNumb };

const setNodeProperty = (mainNode, selectorName, property, value) => { // Изменить свойство узла, если пустое - скрыть
  let cardNode = mainNode.querySelector(selectorName);
  property === 'text' ? cardNode.textContent = value : cardNode.setAttribute(property, value);
  (value === '' || value === null) ? cardNode.classList.add('hidden') : '';
  return mainNode;
}
export { setNodeProperty };

const getNameTypeHousing = (typeHousing) => { // Получить тип жилья, на русском
  switch (typeHousing) {
    case 'bungalow':
      return 'Бунгало';
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    default: return '';
  }
}
export { getNameTypeHousing };

const getTextCapacity = (NumberRooms, NumberGuests) => { // Получить строку кол-ва комнат и гостей, с окончаниями
  let roomsText;
  let guestsText;

  if (NumberRooms === 0 || NumberRooms === '' || NumberGuests === '') {
    return '';
  }

  if (/[2-9]1/.test(NumberRooms) || NumberRooms === 1) {
    roomsText = `${NumberRooms} комната`;
  }
  else if (/[2-4]/.test(NumberRooms) || /[2-9][2-4]/.test(NumberGuests)) {
    roomsText = `${NumberRooms} комнаты`;
  }
  else {
    roomsText = `${NumberRooms} комнат`;
  }

  if (NumberGuests === 0) {
    guestsText = 'не для гостей';
  }
  else if (/[2-9]1/.test(NumberGuests) || NumberGuests === 1) {
    guestsText = `для ${NumberGuests} гостя`;
  }
  else {
    guestsText = `для ${NumberGuests} гостей`;
  }
  return roomsText + ' ' + guestsText;
}
export { getTextCapacity };

const getTextTime = (timeCheckin, timeCheckout) => { // Строка заезда/выезда
  return `Заезд после ${timeCheckin}, выезд до ${timeCheckout}`;
}
export { getTextTime };

const getNodeFeatures = (templateNode, featuresData) => { // Блок особенностей
  let templateFeatures = templateNode.querySelector('.popup__features').cloneNode(true);
  for (let templateFeature of templateFeatures.childNodes) {
    if (templateFeature.nodeName !== '#text') {
      templateFeature.classList.add('hidden');
      for (let i = 0; i < featuresData.length; i++) {
        if (templateFeature.classList.contains('popup__feature--' + featuresData[i])) {
          templateFeature.classList.remove('hidden');
        }
      }
    }
  }
  return templateFeatures;
}
export { getNodeFeatures };

const getNodePhotos = (templateNode, photosData) => { // Блок фотографий
  let templatePhotoNode = templateNode.querySelector('.popup__photos').cloneNode();
  let photosFragment = document.createDocumentFragment();
  for (let i = 0; i < photosData.length; i++) {
    let tempPhoto = templateNode.querySelector('.popup__photo').cloneNode(true);
    tempPhoto.setAttribute('src', photosData[i]);
    tempPhoto.setAttribute('alt', 'Фотография жилья ' + (i + 1));
    photosFragment.appendChild(tempPhoto);
  }
  templatePhotoNode.appendChild(photosFragment);
  return templatePhotoNode;
}
export { getNodePhotos };
