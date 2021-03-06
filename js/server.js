import { openErrorServerPopup } from './util.js';
import { openErrorSendPopup, openSuccessSendPopup } from './util.js';
import { setStatusFilterForm, resetFilterForm } from './filter-form.js';
import { resetAdvertForm } from './advert-form.js';
export { resetMap } from './map.js';


const GET_DATA_ADRESS = 'https://22.javascript.pages.academy/keksobooking/data';
const SEND_DATA_ADRESS = 'https://22.javascript.pages.academy/keksobooking';

//Обработчик ошибки при получении данных
const errorServerHandler = (errorMessage) => {
  openErrorServerPopup(true, errorMessage);
  setStatusFilterForm(false);
}
export { errorServerHandler };

// Получение данных о похожих объявлениях с сервера
const getAdvertsDataOfServer = (onSuccess, onError) => {
  fetch(GET_DATA_ADRESS)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((json) => {
      onSuccess(json);
    })
    .catch((err) => {
      onError(err);
    });
};
export { getAdvertsDataOfServer };

// Обработчик успешного отправления данных
const successSendHandler = () => {
  openSuccessSendPopup(true);
  resetAdvertForm();
  resetFilterForm();
}
export { successSendHandler };

// Обработчик ошибки при отправлении данных
const errorSendHandler = () => {
  openErrorSendPopup(true);
}
export { errorSendHandler };


// Отправление данных с формы на сервер
const sendAdvertOnServer = (formData, onSuccess, onError) => {
  fetch(
    SEND_DATA_ADRESS,
    {
      method: 'POST',
      credentials: 'same-origin',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }
      else {
        onError();
      }
    });
};
export { sendAdvertOnServer };
