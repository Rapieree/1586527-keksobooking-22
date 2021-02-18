const MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
}


const typeOfHouseCombobox = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timeInCombobox = document.querySelector('#timein');
const timeOutCombobox = document.querySelector('#timeout');

const setMinPrice = () => {
  let valueTypeOfHouse = typeOfHouseCombobox.options[typeOfHouseCombobox.selectedIndex].getAttribute('value');
  priceInput.setAttribute('min', MIN_PRICE[valueTypeOfHouse]);
  priceInput.setAttribute('placeholder', MIN_PRICE[valueTypeOfHouse]);
}

setMinPrice(); // Временная инициализация при загрузке страницы

const syncCheckTime = () => {
  return (evt) => {
    if (evt.target.getAttribute('id') === timeInCombobox.getAttribute('id')) {
      timeOutCombobox.selectedIndex = evt.target.selectedIndex;
    }
    else {
      timeInCombobox.selectedIndex = evt.target.selectedIndex;
    }
  }
}

typeOfHouseCombobox.addEventListener('change', setMinPrice);

timeInCombobox.addEventListener('input', syncCheckTime());
timeOutCombobox.addEventListener('input', syncCheckTime());
