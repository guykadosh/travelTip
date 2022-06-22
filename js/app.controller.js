import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { viewLocs } from './views/view.locs.js'
import { viewEvents } from './views/view.events.js'
import { utilService } from './services/util.service.js'

export const controller = {
  onAddLoc,
  onDeleteLoc,
  onGoToLoc,
  onGoToUserPos,
  onSearchLocation,
}

window.onload = onInit

function onInit() {
  showLocations()

  mapService
    .initMap()
    .then(() => {
      renderByQueryStringParams()
    })
    .catch(() => console.log('Error: cannot init map'))

  viewEvents.addEventListeners()
}

function onPanTo({ lat, lng }) {
  mapService.panTo(lat, lng)
  mapService.addMarker({ lat, lng })

  utilService.setQueryStringParams(lat, lng)
}

function onDeleteLoc(ev) {
  const locId = ev.target.dataset.id
  locService.deleteLoc(locId)
  showLocations()
}

function onGoToLoc(ev) {
  const data = ev.target.closest('[data-lat]').dataset

  const lat = +data.lat
  const lng = +data.lng

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
  showLocations()
}

function onSearchLocation(ev) {
  ev.preventDefault()

  const adress = document.querySelector('.search-input').value
  mapService.getAddressCoords(adress).then(address => {
    onPanTo(address.pos)
    locService.addLoc(address.pos, address.locName)
    showLocations()
  })
}

function showLocations() {
  showLoader()
  locService.getLocs().then(viewLocs.renderFavLocs)
}

function showLoader() {
  document.querySelector('.spinner').classList.remove('hide')
  document.querySelector('.locations').classList.add('hide')
}

function renderByQueryStringParams() {
  // Retrieve data from the current query-params
  const queryStringParams = new URLSearchParams(window.location.search)

  const pos = {
    lat: +queryStringParams.get('lat') || 0,
    lng: +queryStringParams.get('lng') || 0,
  }

  // return if no pos on the queries
  if (!pos.lat && !pos.lng) return

  console.log('Hi')
  onPanTo(pos)
}
