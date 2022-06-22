import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'

export const locService = {
  getLocs,
  addLoc,
  deleteLoc,
}

const LOCS_KEY = 'locsDB'
const locs = _createLocs()

function getLocs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(locs)
    }, 2000)
  })
}
function addLoc(loc, name) {
  locs.push(_createLoc(loc, name))
}

function _createLoc(loc, name) {
  return {
    id: utilService.makeId(),
    name,
    loc,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  storageService.save(LOCS_KEY, locs)
}

function _createLocs() {
  let locs = storageService.load(LOCS_KEY)

  if (!locs || !locs.length) {
    locs = [
      _createLoc({ lat: 32.047104, lng: 34.832384 }, 'Greatplace'),
      _createLoc({ lat: 32.047201, lng: 34.832581 }, 'Neveragain'),
    ]
  }

  storageService.save(LOCS_KEY, locs)
  return locs
}

function deleteLoc(locId) {}
