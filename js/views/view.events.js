function addEventListeners() {
  document
    .querySelector('.btn-add-marker')
    .addEventListener('click', onAddMarker)
  document
    .querySelector('.btn-user-pos')
    .addEventListener('click', onGetUserPos)
  document.querySelector('.btn-get-locs').addEventListeners('click', onGetLocs)
  document.querySelector('.btn-pan').addEventListeners('click', onPanTo)
}
