const filterForm = document.querySelector('.map__filters');
const filterTypeOfHouse = document.querySelector('#housing-type');
const filterPrice = document.querySelector('#housing-price');
const filterRooms = document.querySelector('#housing-rooms');
const filterGuests = document.querySelector('#housing-guests');
const filterFeatures = document.querySelectorAll('.map__checkbox');

// Активность формы фильтра
const setStatusFilterForm = (flag) => {
  let NodeList = filterForm.children;
  if(flag === false) {
    filterForm.classList.add('map__filters--disabled');
    filterForm.setAttribute('disabled', '');
    for(let nodeItem of NodeList) {
      nodeItem.setAttribute('disabled', '');
    }
  }
  else {
    filterForm.classList.remove('map__filters--disabled');
    filterForm.removeAttribute('disabled');
    for(let nodeItem of NodeList) {
      nodeItem.removeAttribute('disabled');
    }
  }
}
export { setStatusFilterForm };

// Вернуть фильтр в исходное состояние
const resetFilterForm = () => {
  filterForm.reset();
}
export { resetFilterForm };

// Инициализация фильтра
const filterInitialization = (cb) => {
  filterTypeOfHouse.addEventListener('change', () => cb());
  filterPrice.addEventListener('change', () => cb());
  filterRooms.addEventListener('change', () => cb());
  filterGuests.addEventListener('change', () => cb());
  filterFeatures.forEach((feature) => {
    feature.addEventListener('change', () => cb());
  });
  filterForm.addEventListener('reset', () => cb());
}
export { filterInitialization };
