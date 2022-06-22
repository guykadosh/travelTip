export const mapService = {
  initMap,
  addMarker,
  panTo,
  getCurrLoc,
  getUserPos
}

var gMap
let gCurrLoc

function getCurrLoc() {
  return gCurrLoc
}

function initMap(lat = 32.0749831, lng = 34.9120554) {
  console.log('InitMap')
  return _connectGoogleApi().then(() => {
    console.log('google available')
    gMap = new google.maps.Map(document.querySelector('#map'), {
      center: { lat, lng },
      zoom: 15,
    })
    console.log('Map!', gMap)
    gMap.addListener('click', ev => {
      const lat = ev.latLng.lat()
      const lng = ev.latLng.lng()

      addMarker(ev.latLng)
      panTo(lat, lng)

      gCurrLoc = { lat, lng }
    })
  })
}

function addMarker(loc) {
  var marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title: 'Hello World!',
  })
  return marker
}

function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng)
  gMap.panTo(laLatLng)
  gCurrLoc = { lat, lng }
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve()
  const API_KEY = 'AIzaSyCkGvOiUSEqM5BMxvFVJq2kTDQ-gWzGvTE'
  var elGoogleApi = document.createElement('script')
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
  elGoogleApi.async = true
  document.body.append(elGoogleApi)

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve
    elGoogleApi.onerror = () => reject('Google script failed to load')
  })
}

function getUserPos() {
  if (!navigator.geolocation) return
  return new Promise((resolve, reject) => 
        navigator.geolocation.getCurrentPosition(resolve, reject))
          .then(res => {
            return {
              lat: res.coords.latitude,
              lng: res.coords.longitude
            }
          })
}








