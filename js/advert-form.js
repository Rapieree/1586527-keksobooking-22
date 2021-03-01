import { sendAdvertOnServer, successSendHandler, errorSendHandler } from './server.js';

const advertForm = document.querySelector('.ad-form');
const advertFieldsetList = advertForm.querySelectorAll('fieldset');

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
setStatusAdvertForm(false);

// Установить значение в поле адреса
const addressInput = document.querySelector('#address');

const setAddressValue = ({ x, y }) => {
  addressInput.setAttribute('value', x + ', ' + y);
}
export { setAddressValue };

// Инициализация кнопки отправления данных на сервер
advertForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendAdvertOnServer(formData, successSendHandler, errorSendHandler);
})

const resetAdvertForm = () => {
  advertForm.reset();
}
export { resetAdvertForm };
