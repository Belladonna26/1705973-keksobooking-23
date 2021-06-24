const adForm = document.querySelector('.ad-form');

if(adForm === null) {
  throw new Error('Не найден adForm');
}

export const disableAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  Array.from(adForm.elements).forEach((element) => {
    element.disabled = true;
  });
};

export const enableAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  Array.from(adForm.elements).forEach((element) => {
    element.disabled = false;
  });
};
