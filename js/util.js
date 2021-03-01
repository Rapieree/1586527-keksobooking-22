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

// попап ошибки получения данных с сервера
const errorServerPopup = document.querySelector('.error-server');
const errorServerbutton = errorServerPopup.querySelector('.error-server__button');

// открыть/закрыть попап с ошибкой сервера
const openErrorServerPopup = (flag) => {
  const openClass = 'error-server--open';
  if (flag && !errorServerPopup.classList.contains(openClass)) {
    errorServerPopup.classList.add(openClass);

    errorServerbutton.addEventListener('click', () => {
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
const mainTag = document.querySelector('main');
const successSendPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

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
const errorSendPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

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
