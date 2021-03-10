import {
  setNodeProperty,
  getNameTypeHousing,
  getTextTime,
  getTextCapacity,
  getNodeFeatures,
  getNodePhotos
} from './util.js';

const PopupClass = {
  TITLE: '.popup__title',
  ADDRESS: '.popup__text--address',
  PRICE: '.popup__text--price',
  TYPE: '.popup__type',
  CAPACITY: '.popup__text--capacity',
  CHECK_TIME: '.popup__text--time',
  FEATURES: '.popup__features',
  PHOTOS: '.popup__photos',
  AVATAR: '.popup__avatar',
}

const cardTemplate = document.querySelector('#card').content.querySelector('.popup'); // шаблон карточки объявления

const getAdvertCard = (advertData) => {
  const card = cardTemplate.cloneNode(true);
  setNodeProperty(card, PopupClass.TITLE, 'text', advertData.offer.title); // Название
  setNodeProperty(card, PopupClass.ADDRESS, 'text', advertData.offer.address); // Адрес
  setNodeProperty(card, PopupClass.PRICE, 'text', advertData.offer.price + ' ₽/ночь'); // Цена
  setNodeProperty(card, PopupClass.TYPE, 'text', getNameTypeHousing(advertData.offer.type)); // Тип жилья
  setNodeProperty(card, PopupClass.CAPACITY, 'text', getTextCapacity(advertData.offer.rooms, advertData.offer.guests)); // Строка гостей\комнат
  setNodeProperty(card, PopupClass.CHECK_TIME, 'text', getTextTime(advertData.offer.checkin, advertData.offer.checkout)); // Время заезда\выезда
  card.querySelector(PopupClass.FEATURES).replaceWith(getNodeFeatures(card, advertData.offer.features)); // Блок особенностей
  card.querySelector(PopupClass.PHOTOS).replaceWith(getNodePhotos(card, advertData.offer.photos)); // Блок фотографий
  setNodeProperty(card, PopupClass.PHOTOS, 'src', advertData.author.avatar); // Аватарка
  return card;
}
export { getAdvertCard };
