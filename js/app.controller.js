import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { viewLocs } from './views/view.locs.js'

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
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  console.log('Getting Pos')
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

function onAddMarker() {
  console.log('Adding a marker')
  mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
  locService.getLocs().then(locs => {
    console.log('Locations:', locs)
    document.querySelector('.locs').innerText = JSON.stringify(locs)
  })
}

// function onGetUserPos() {
//   getPosition()
//     .then(pos => {
//       console.log('User position is:', pos.coords)
//       document.querySelector(
//         '.user-pos'
//       ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
//     })
//     .catch(err => {
//       console.log('err!!!', err)
//     })
// }

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
  mapService.getUserPos()
    .then(pos => onPanTo(pos))
}
