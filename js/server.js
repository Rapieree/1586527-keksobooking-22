import { openErrorServerPopup } from './util.js';
import { openErrorSendPopup, openSuccessSendPopup } from './util.js';
import { setStatusFilterForm } from './filter-form.js';
import { resetAdvertForm } from './advert-form.js';


const GET_DATA_ADRESS = 'https://22.javascript.pages.academy/keksobooking/data';
const SEND_DATA_ADRESS = 'https://22.javascript.pages.academy/keksobooking';

//Обработчик ошибки при получении данных
const errorServerHandler = () => {
  openErrorServerPopup(true);
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
      // eslint-disable-next-line no-console
      console.log(err);
      onError();
    });
};
export { getAdvertsDataOfServer };

// Обработчик успешного отправления данных
const successSendHandler = () => {
  openSuccessSendPopup(true);
  resetAdvertForm();
}
export { successSendHandler };

const errorSendHandler = () => {
  openErrorSendPopup(true);
}
export { errorSendHandler };

// Обработчик ошибки при отправлении данных

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
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((json) => {
      onSuccess();
      // eslint-disable-next-line no-console
      console.log(json);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      onError();
    });
};
export { sendAdvertOnServer };
