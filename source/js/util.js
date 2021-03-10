const DEFAULT_FILTER = 'any'; // исходный вариант фильтра
const Price = { // Значения стоимости для присвоения категории цены
  LOW_LIMIT : 10000,
  MIDDLE_LIMIT : 50000,
}

const mainTag = document.querySelector('main');
const errorServerPopup = document.querySelector('.error-server');
const errorServerButton = errorServerPopup.querySelector('.error-server__button');
const successSendPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorSendPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

// Изменить свойство узла, если узел пустой - скрыть
const setNodeProperty = (mainNode, selectorName, property, value) => {
  let cardNode = mainNode.querySelector(selectorName);
  property === 'text' ? cardNode.textContent = value : cardNode.setAttribute(property, value);
  (value === '' || value === null) ? cardNode.classList.add('hidden') : '';
  return mainNode;
}
export { setNodeProperty };

// Получить тип жилья, на русском
const getNameTypeHousing = (typeHousing) => {
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

// Получить строку кол-ва комнат и гостей, с окончаниями
const getTextCapacity = (NumberRooms, NumberGuests) => {
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

// Получить строку заезда/выезда
const getTextTime = (timeCheckin, timeCheckout) => {
  return `Заезд после ${timeCheckin}, выезд до ${timeCheckout}`;
}
export { getTextTime };

// Получить узел блока особенностей
const getNodeFeatures = (templateNode, featuresData) => {
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

// Получить узел блока фотографий
const getNodePhotos = (templateNode, photosData) => {
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

// открыть/закрыть попап с ошибкой сервера
const openErrorServerPopup = (flag, errorMessage) => {
  const openClass = 'error-server--open';
  if (flag && !errorServerPopup.classList.contains(openClass)) {
    errorServerPopup.querySelector('.error-server__message').textContent = ` ${errorMessage}`;
    errorServerPopup.classList.add(openClass);
    errorServerButton.addEventListener('click', () => {
      errorServerPopup.classList.remove(openClass);
    });
  }
  else if (!flag && errorServerPopup.classList.contains(openClass)) {
    errorServerPopup.classList.remove(openClass);
  }
}
export { openErrorServerPopup };

// Попап успешной отправки / ошибки данных на сервер
// Вернуть открытый попап
const getOpenPopup = () => {
  const succesNode = document.querySelector('.success');
  const errorNode = document.querySelector('.error');
  if(succesNode) {
    return succesNode;
  }
  else if (errorNode) {
    return errorNode;
  }
  else {
    return null;
  }
}

// Установить / Сбросить обработчики закрытия попапа
const onPopupEscapeKeyDown = (evt) => {
  if(evt.key === ('Escape' || 'Esc')) {
    evt.preventDefault();
    getOpenPopup().remove();
    document.removeEventListener('keydown', onPopupEscapeKeyDown);
  }
}

const onPopupClick = () => {
  getOpenPopup().remove();
  document.removeEventListener('keydown', onPopupEscapeKeyDown);
}

// Успешная отправка на сервер
const openSuccessSendPopup = (flag) => {
  if (flag && getOpenPopup() === null) {
    mainTag.prepend(successSendPopup);
    document.addEventListener('keydown', onPopupEscapeKeyDown);
    getOpenPopup().addEventListener('click', onPopupClick);
  }
  else if(!flag && getOpenPopup()) {
    getOpenPopup().removeEventListener('click', onPopupClick);
    getOpenPopup().remove();
    document.removeEventListener('keydown', onPopupEscapeKeyDown);
  }
}
export { openSuccessSendPopup };

// Ошибка отправки на сервер
const openErrorSendPopup = (flag) => {
  if (flag && getOpenPopup() === null) {
    mainTag.prepend(errorSendPopup);
    document.addEventListener('keydown', onPopupEscapeKeyDown);
    getOpenPopup().addEventListener('click', onPopupClick);
  }
  else if(!flag && getOpenPopup()) {
    getOpenPopup().removeEventListener('click', onPopupClick);
    getOpenPopup().remove();
    document.removeEventListener('keydown', onPopupEscapeKeyDown);
  }
}
export { openErrorSendPopup };

// Функции для фильтрации объявлений
// Соотношение числовой стоимости жилья к фильтровому
const getTypeOfPrice = (price) => {
  if (price <= Price.LOW_LIMIT) {
    return 'low';
  }
  else if (price >= Price.LOW_LIMIT && price <= Price.MIDDLE_LIMIT) {
    return 'middle';
  }
  else if (price >= Price.MIDDLE_LIMIT) {
    return 'high';
  }
}
export { getTypeOfPrice };

// Расчет рейтинга
const getAdvertRank = (advert) => {
  let filterTypeOfHouse = document.querySelector('#housing-type').value;
  const filterPrice = document.querySelector('#housing-price').value;
  const filterRooms = document.querySelector('#housing-rooms').value;
  const filterGuests = document.querySelector('#housing-guests').value;
  const filterFeatures = document.querySelectorAll('input[type=checkbox]:checked');
  let rank = 0;
  if (advert.offer.type === filterTypeOfHouse || filterTypeOfHouse === DEFAULT_FILTER) {
    rank += 3;
  }
  else {
    return 0;
  }
  if (getTypeOfPrice(+advert.offer.price) === filterPrice || filterPrice === DEFAULT_FILTER) {
    rank += 2;
  }
  else {
    return 0;
  }
  if (advert.offer.rooms === +filterRooms || filterRooms === DEFAULT_FILTER) {
    rank += 1;
  }
  else {
    return 0;
  }
  if (advert.offer.guests === +filterGuests || filterGuests === DEFAULT_FILTER) {
    rank += 1;
  }
  else {
    return 0;
  }
  for(let filter of filterFeatures) {
    let successFind = false;
    for(let advertValue of advert.offer.features) {
      if (advertValue === filter.defaultValue) {
        successFind = true;
        rank += 0.25;
        break;
      }
    }
    if(successFind === false) {
      return 0;
    }
  }
  return rank;
}

// Функция-компаратор по рейтингу с пометкой объявления о соответствии фильтру
const sortAdverts = (advertA, advertB) => {
  const rankA = getAdvertRank(advertA);
  const rankB = getAdvertRank(advertB);
  advertA.filterFlag = true;
  advertB.filterFlag = true;
  if(rankA === 0) {
    advertA.filterFlag = false;
  }
  if(rankB === 0) {
    advertB.filterFlag = false;
  }
  return rankB - rankA;
}
export { sortAdverts };
