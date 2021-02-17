import { getAdvertsDataArray } from './data.js';

const advertsDataArray = getAdvertsDataArray();
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const advertsListFragment = document.createDocumentFragment();

const setNodeProperty = (mainNode, selectorName, property, value) => {
  let cardNode = mainNode.querySelector(selectorName);
  property === 'text' ? cardNode.textContent = value : cardNode.setAttribute(property, value);
  (value === '' || value === null) ? cardNode.setAttribute('hidden', '') : '';
  return mainNode;
}

const getNameTypeHousing = (typeHousing) => {
  switch (typeHousing) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    default: return '';
  }
}

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

const getTextTime = (timeCheckin, timeCheckout) => {
  return `Заезд после ${timeCheckin}, выезд до ${timeCheckout}`;
}

const getNodeFeatures = (templateNode, featuresData) => {
  let templateFeatures = templateNode.querySelector('.popup__features').cloneNode(true);
  for (let templateFeature of templateFeatures.childNodes) {
    if (templateFeature.nodeName !== '#text') {
      templateFeature.style.display = 'none';
      for (let i = 0; i < featuresData.length; i++) {
        if (templateFeature.classList.contains('popup__feature--' + featuresData[i])) {
          templateFeature.style.display = '';
        }
      }
    }
  }
  return templateFeatures;
}

const getNodePhotos = (templateNode, photosData) => {
  let templatePhotoNode = templateNode.querySelector('.popup__photos').cloneNode();
  let photosFragment = document.createDocumentFragment();
  for (let i = 0; i < photosData.length; i++) {
    let tempPhoto = templateNode.querySelector('.popup__photo').cloneNode(true);
    tempPhoto.setAttribute('src', photosData[i]);
    tempPhoto.setAttribute('alt', 'Фотография жилья ' + (i+1));
    photosFragment.appendChild(tempPhoto);
  }
  templatePhotoNode.appendChild(photosFragment);
  return templatePhotoNode;
}

const createAdvertsFragment = (template, advertsData) => {
  for (let advertData of advertsData) {
    const card = template.cloneNode(true);

    setNodeProperty(card, '.popup__title', 'text', advertData.offer.title); // Название
    setNodeProperty(card, '.popup__text--address', 'text', advertData.offer.address); // Адрес
    setNodeProperty(card, '.popup__text--price', 'text', advertData.offer.price + ' ₽/ночь'); // Цена
    setNodeProperty(card, '.popup__type', 'text', getNameTypeHousing(advertData.offer.type)); // Тип жилья
    setNodeProperty(card, '.popup__text--capacity', 'text', getTextCapacity(advertData.offer.rooms, advertData.offer.guests)); // Строка гостей\комнат
    setNodeProperty(card, '.popup__text--time', 'text', getTextTime(advertData.offer.checkin, advertData.offer.checkout)); // Время заезда\выезда
    card.querySelector('.popup__features').replaceWith(getNodeFeatures(card, advertData.offer.features)); // Блок особенностей
    card.querySelector('.popup__photos').replaceWith(getNodePhotos(card, advertData.offer.photos)); // Блок фотографий
    card.querySelector('.popup__avatar').setAttribute('src', advertData.author.avatar); // Аватарка

    advertsListFragment.appendChild(card);
  }
}

createAdvertsFragment(cardTemplate, advertsDataArray);

document.querySelector('.map__canvas').appendChild(advertsListFragment.querySelector('.popup'));

