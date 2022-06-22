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
    .querySelector('.btn-copy')
    .addEventListener('click', controller.onCopyUrl)
  document
    .querySelector('.seacrh-location')
    .addEventListener('submit', controller.onSearchLocation)
}
