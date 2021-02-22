import { getAdvertsDataArray } from './data.js';
import {
  setNodeProperty,
  getNameTypeHousing,
  getTextTime,
  getTextCapacity,
  getNodeFeatures,
  getNodePhotos
} from './util.js';

const advertsDataArray = getAdvertsDataArray();
const cardTemplate = document.querySelector('#card').content.querySelector('.popup'); // шаблон карточки объявления
const advertsListFragment = document.createDocumentFragment();

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

const getAdvertsCardsArray = () => {
  return advertsListFragment;
}
export { getAdvertsCardsArray };

//document.querySelector('.map__canvas').appendChild(advertsListFragment.querySelector('.popup'));

