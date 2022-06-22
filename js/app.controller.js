import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { viewLocs } from './views/view.locs.js'
import { viewEvents } from './views/view.events.js'

export const controller = {
  onAddLoc,
}

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
// window.onGetUserPos = onGetUserPos
window.onGoToUserPos = onGoToUserPos

function onInit() {
  locService.getLocs().then(viewLocs.renderFavLocs)

  mapService
    .initMap()
    .then(() => {
      console.log('Map is ready')
    })
    .catch(() => console.log('Error: cannot init map'))

  viewEvents.addEventListeners()
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  console.log('Getting Pos')
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

function onPanTo({ lat, lng }) {
  console.log('Panning the Map')
  mapService.panTo(lat, lng)
}

function onDeleteLoc(locId) {
  locService.deleteLoc(locId)
  mapService.renderFavLocs()
}

function onGoTo({ lat, lng }) {
  onPanTo(lat, lng)
}

function onGoToUserPos() {
  mapService.getUserPos().then(pos => onPanTo(pos))
}

function onAddLoc(ev) {
  ev.preventDefault()

  const locName = document.querySelector('.loc-name').value
  if (!locName) return

  const loc = mapService.getCurrLoc()

  locService.addLoc(loc, locName)
  locService.getLocs().then(viewLocs.renderFavLocs)
}
