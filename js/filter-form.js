const filterForm = document.querySelector('.map__filters');

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
    filterForm.removeAttribute('disabled', '');
    for(let nodeItem of NodeList) {
      nodeItem.removeAttribute('disabled');
    }
  }
}
export { setStatusFilterForm };
setStatusFilterForm(false);

// Вернуть фильтр в исходное состояние
const resetFilterForm = () => {
  filterForm.reset();
}
export { resetFilterForm };
