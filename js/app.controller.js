import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { viewLocs } from './views/view.locs.js'
import { viewEvents } from './views/view.events.js'

export const controller = {
  onAddLoc,
  onDeleteLoc,
  onGoToLoc,
}

window.onload = onInit

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

function onDeleteLoc(ev) {
  const locId = ev.target.dataset.id
  locService.deleteLoc(locId)
  locService.getLocs().then(viewLocs.renderFavLocs)
}

function onGoToLoc(ev) {
  console.log(ev.target.dataset)
  const lat = +ev.target.dataset.lat
  const lng = +ev.target.dataset.lng

  console.log(lat, lng)
  onPanTo({ lat, lng })
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
