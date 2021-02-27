const MAX_PRICE = 1000000;
const MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
}

const typeOfHouseCombobox = document.querySelector('#type');
const priceInput = document.querySelector('#price');

const setMinPrice = () => { // Минимальная цена при выборе типа жилья
  const valueTypeOfHouse = typeOfHouseCombobox.options[typeOfHouseCombobox.selectedIndex].getAttribute('value');
  priceInput.setAttribute('min', MIN_PRICE[valueTypeOfHouse]);
  priceInput.setAttribute('placeholder', MIN_PRICE[valueTypeOfHouse]);
}

const validatePriceInput = () => {
  const minPriceValue = MIN_PRICE[typeOfHouseCombobox.options[typeOfHouseCombobox.selectedIndex].getAttribute('value')];
  const TypeOfHouse = typeOfHouseCombobox.options[typeOfHouseCombobox.selectedIndex].textContent.toLowerCase();

  if (Number(priceInput.value) < minPriceValue) {
    priceInput.setCustomValidity(`Минимальная цена за ночь для типа жилья: ${TypeOfHouse} - ${minPriceValue} рублей`);
  } else if (Number(priceInput.value) > MAX_PRICE) {
    priceInput.setCustomValidity('Максимальная цена за ночь: ' + MAX_PRICE);
    //priceInput.value = MAX_PRICE;
  } else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
}

const timeInCombobox = document.querySelector('#timein');
const timeOutCombobox = document.querySelector('#timeout');

const syncCheckTime = () => { // синхронизация времени въезда и выезда
  return (evt) => {
    if (evt.target.getAttribute('id') === timeInCombobox.getAttribute('id')) {
      timeOutCombobox.selectedIndex = evt.target.selectedIndex;
    }
    else {
      timeInCombobox.selectedIndex = evt.target.selectedIndex;
    }
  }
}

const roomsCombobox = document.querySelector('#room_number');
const capacityCombobox = document.querySelector('#capacity');

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

const advertForm = document.querySelector('.ad-form');
const advertFieldsetList = advertForm.querySelectorAll('fieldset');

const setStatusAdvertForm = (flag) => { // Доступность формы
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

const addressInput = document.querySelector('#address');

const setAddressValue = ({ x, y }) => {
  addressInput.setAttribute('value', x + ', ' + y);
}
export { setAddressValue };

const initializingAdvertForm = () => {
  setStatusAdvertForm(true);
  syncRoomAndCapacity();
  setMinPrice();
  typeOfHouseCombobox.addEventListener('input', setMinPrice);
  priceInput.addEventListener('input', validatePriceInput);
  timeInCombobox.addEventListener('input', syncCheckTime());
  timeOutCombobox.addEventListener('input', syncCheckTime());
  roomsCombobox.addEventListener('change', syncRoomAndCapacity);
}
export { initializingAdvertForm };

setStatusAdvertForm(false);
