export const utilService = {
  makeId,
  setQueryStringParams,
}

function makeId(length = 4) {
  const letters = 'abcdefghijklmnopqrstuvwxyz'
  const digits = '0123456789'

  let txt = letters.charAt(Math.floor(Math.random() * letters.length))

  for (let i = 0; i < length - 1; i++) {
    txt += digits.charAt(Math.floor(Math.random() * digits.length))
  }
  return txt
}

function setQueryStringParams(lat, lng) {
  const queryStringParams = `?lat=${lat}&lng=${lng}`

  const newUrl =
    window.location.protocol +
    '//' +
    window.location.host +
    window.location.pathname +
    queryStringParams
  window.history.pushState({ path: newUrl }, '', newUrl)
}
