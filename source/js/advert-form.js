import {
  sendAdvertOnServer,
  successSendHandler,
  errorSendHandler,
  resetMap as clearAddress
} from './server.js';
import {
  onAvatarFileChange,
  onPhotosFilesChange,
  clearAvatar,
  clearPhotos
} from './upload-photo.js';

const MAX_PRICE = 1000000;
const MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
}
const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const ERROR_CLASS_TITLE = 'ad-form__title-input--error';
const ERROR_CLASS_PRICE = 'ad-form__price-input--error';

const timeInCombobox = document.querySelector('#timein');
const timeOutCombobox = document.querySelector('#timeout');
const roomsCombobox = document.querySelector('#room_number');
const capacityCombobox = document.querySelector('#capacity');
const advertForm = document.querySelector('.ad-form');
const advertFieldsetList = advertForm.querySelectorAll('fieldset');
const addressInput = document.querySelector('#address');
const avatarFileInput = document.querySelector('#avatar');
const housePhotoFileInput = document.querySelector('#images');
const typeOfHouseCombobox = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const titleInput = document.querySelector('#title');
const clearButton = document.querySelector('.ad-form__reset');

// Устновить минимальную цену при выборе типа жилья
const setMinPrice = () => {
  const valueTypeOfHouse = typeOfHouseCombobox.options[typeOfHouseCombobox.selectedIndex].getAttribute('value');
  priceInput.setAttribute('min', MIN_PRICE[valueTypeOfHouse]);
  priceInput.setAttribute('placeholder', MIN_PRICE[valueTypeOfHouse]);
}

// Валидация стоимости жилья за ночь
const validatePriceInput = () => {
  const minPriceValue = MIN_PRICE[typeOfHouseCombobox.options[typeOfHouseCombobox.selectedIndex].getAttribute('value')];
  const TypeOfHouse = typeOfHouseCombobox.options[typeOfHouseCombobox.selectedIndex].textContent.toLowerCase();
  if (Number(priceInput.value) < minPriceValue) {
    priceInput.setCustomValidity(`Минимальная цена за ночь для типа жилья: ${TypeOfHouse} - ${minPriceValue} рублей`);
  }
  else if (Number(priceInput.value) > MAX_PRICE) {
    priceInput.setCustomValidity('Максимальная цена за ночь: ' + MAX_PRICE);
  }
  else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
}

// Сбросить состояние ошибки валидации
const resetInvalidInputs = () => {
  (titleInput.classList.contains(ERROR_CLASS_TITLE)) ? titleInput.classList.remove(ERROR_CLASS_TITLE) : '';
  (priceInput.classList.contains(ERROR_CLASS_PRICE)) ? priceInput.classList.remove(ERROR_CLASS_PRICE) : '';
  titleInput.setCustomValidity('');
  priceInput.setCustomValidity('');
}

// При ошибке валидации заголовка объявления
const onTitleInputInvalid = () => {
  (!titleInput.classList.contains(ERROR_CLASS_TITLE)) ? titleInput.classList.add(ERROR_CLASS_TITLE) : '';
}

// При ошибке валидации цены
const onPriceInputInvalid = () => {
  (!priceInput.classList.contains(ERROR_CLASS_PRICE)) ? priceInput.classList.add(ERROR_CLASS_PRICE) : '';
}

// Валидация заголовка объявления
const validateTitleInput = () => {
  const lengthField = titleInput.value.length;
  if (lengthField < MIN_LENGTH_TITLE) {
    titleInput.setCustomValidity(
      `Минимальная длина заголовка: ${MIN_LENGTH_TITLE} симв.
      Осталось ввести: ${MIN_LENGTH_TITLE - lengthField} симв.`);
  }
  else if (lengthField > MAX_LENGTH_TITLE) {
    titleInput.setCustomValidity(
      `Максимальная длина заголовка: ${MAX_LENGTH_TITLE} симв.
      Уберите ${MAX_LENGTH_TITLE - lengthField} симв.`);
  }
  else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
}

// синхронизация времени въезда и выезда
const syncCheckTime = (evt) => {
  if (evt.target.getAttribute('id') === timeInCombobox.getAttribute('id')) {
    timeOutCombobox.selectedIndex = evt.target.selectedIndex;
  }
  else {
    timeInCombobox.selectedIndex = evt.target.selectedIndex;
  }
}

// Синхронизация полей кол-ва комнат и гостей
const syncRoomAndCapacity = () => {
  const roomSelected = Number(roomsCombobox.options[roomsCombobox.selectedIndex].value);
  for (let i = 0; i < capacityCombobox.options.length; i++) {
    let option = capacityCombobox.options[i];
    if (Number(option.value) <= roomSelected && Number(option.value) !== 0 && roomSelected !== 100) {
      option.hidden = false;
      capacityCombobox.selectedIndex = i;
    }
    else if (Number(option.value) === 0 && roomSelected === 100) {
      option.hidden = false;
      capacityCombobox.selectedIndex = i;
    }
    else {
      option.hidden = true;
    }
  }
}

// Активность формы заполнения объявления
const setStatusAdvertForm = (flag) => {
  if (flag === false) {
    advertForm.classList.add('ad-form--disabled');
    advertForm.setAttribute('disabled', '');
    for (let fieldset of advertFieldsetList) {
      fieldset.setAttribute('disabled', '');
    }
  }
  else {
    advertForm.classList.remove('ad-form--disabled');
    advertForm.removeAttribute('disabled');
    for (let fieldset of advertFieldsetList) {
      fieldset.removeAttribute('disabled');
    }
  }
}
export { setStatusAdvertForm };

// Установить значение в поле адреса
const setAddressValue = ({ x, y }) => {
  addressInput.setAttribute('value', x + ', ' + y);
}
export { setAddressValue };

// Инициализация кнопки отправления данных на сервер
const onAdvertFormSubmit = (evt) => {
  evt.preventDefault();
  if (evt.target.checkValidity()) {
    resetInvalidInputs();
    const formData = new FormData(evt.target);
    sendAdvertOnServer(formData, successSendHandler, errorSendHandler);
  }
}

// Очистить форму объявлений
const resetAdvertForm = () => {
  advertForm.reset();
  clearAddress();
  clearAvatar();
  clearPhotos();
  resetInvalidInputs();
}
export { resetAdvertForm };

// Инициализация формы объявлений
const initializingAdvertForm = () => {
  setStatusAdvertForm(true);
  syncRoomAndCapacity();
  setMinPrice();
  typeOfHouseCombobox.addEventListener('input', setMinPrice);
  priceInput.addEventListener('input', validatePriceInput);
  priceInput.addEventListener('invalid', onPriceInputInvalid);
  titleInput.addEventListener('input', validateTitleInput);
  titleInput.addEventListener('invalid', onTitleInputInvalid);
  timeInCombobox.addEventListener('input', syncCheckTime);
  timeOutCombobox.addEventListener('input', syncCheckTime);
  roomsCombobox.addEventListener('change', syncRoomAndCapacity);
  avatarFileInput.addEventListener('change', onAvatarFileChange);
  housePhotoFileInput.addEventListener('change', onPhotosFilesChange);
  clearButton.addEventListener('click', resetAdvertForm);
  advertForm.addEventListener('submit', onAdvertFormSubmit);
}
export { initializingAdvertForm };
