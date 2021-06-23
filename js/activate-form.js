const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

adForm.classList.add('ad-form--disabled');
// eslint-disable-next-line id-length
for (let i=0; i < adForm.elements.length; i++) {
  adForm[i].setAttribute('disabled', 'disabled');
}

mapFilters.classList.add('map__filters--disabled');
// eslint-disable-next-line id-length
for (let j=0; j < mapFilters.elements.length; j++) {
  mapFilters[j].setAttribute('disabled', 'disabled');
}

export const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  // eslint-disable-next-line id-length
  for (let i = 0; i < adForm.elements.length; i++) {
    adForm[i].removeAttribute('disabled', 'disabled');
  }
  mapFilters.classList.remove('map__filters--disabled');
  // eslint-disable-next-line id-length
  for (let i = 0; i < mapFilters.elements.length; i++) {
    mapFilters[i].removeAttribute('disabled', 'disabled');
  }
};
