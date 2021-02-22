

const advertForm = document.querySelector('.ad-form');
const advertFieldsetList = advertForm.querySelectorAll('fieldset');

const setStatusAdvertForm = (flag) => {
  if(flag === false) {
    advertForm.classList.add('ad-form--disabled');
    advertForm.setAttribute('disabled', '');
    for(let fieldset of advertFieldsetList) {
      fieldset.setAttribute('disabled', '');
    }
  }
  else {
    advertForm.classList.remove('ad-form--disabled');
    advertForm.removeAttribute('disabled');
    for(let fieldset of advertFieldsetList) {
      fieldset.removeAttribute('disabled');
    }
  }
}
export { setStatusAdvertForm };
setStatusAdvertForm(false);

const addressInput = document.querySelector('#address');

const setAddressValue = ({x, y}) => {
  addressInput.setAttribute('value', x + ', ' + y);
}
export { setAddressValue };
