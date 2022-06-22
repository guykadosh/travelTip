import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'

export const locService = {
  getLocs,
}

const LOCS_KEY = 'locsDB'
const locs = _createLocs()

/*

*/

function getLocs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(locs)
    }, 2000)
  })
}

function createLoc(loc, name) {
  locs.push({
    id: utilService.makeId(),
    name,
    loc,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  storageService.save(LOCS_KEY, locs)
}

function _createLocs() {
  let locs = storageService.load(LOCS_KEY)

  if (!locs || !locs.length) {
    locs = [
      createLoc({ lat: 32.047104, lng: 34.832384 }, 'Greatplace'),
      createLoc({ lat: 32.047201, lng: 34.832581 }, 'Neveragain'),
    ]
  }

  storageService.save(LOCS_KEY, locs)
  return locs
}
