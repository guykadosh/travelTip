import { controller } from '../app.controller.js'

export const viewEvents = {
  addEventListeners,
}

function addEventListeners() {
  document
    .querySelector('.add-loc')
    .addEventListener('click', controller.onAddLoc)
  document
    .querySelector('.btn-user-pos')
    .addEventListener('click', controller.onGoToUserPos)
  document
    .querySelector('.seacrh-location')
    .addEventListener('submit', controller.onSearchLocation)
}
