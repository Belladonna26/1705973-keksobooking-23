const mapFiltersForm = document.querySelector('.map__filters');

if (mapFiltersForm === null) {
  throw new Error('Не найден mapFiltersForm');
}

export const disableMapFiltersForm = () => {
  mapFiltersForm.classList.add('map__filters--disabled');
  Array.from(mapFiltersForm.elements).forEach((element) => {
    element.disabled = true;
  });
};

export const enableMapFiltersForm = () => {
  mapFiltersForm.classList.remove('map__filters--disabled');
  Array.from(mapFiltersForm.elements).forEach((element) => {
    element.disabled = false;
  });
};
