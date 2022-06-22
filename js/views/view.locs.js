import { controller } from '../app.controller.js'

export const viewLocs = {
  renderFavLocs,
}

function renderFavLocs(locs) {
  let strHtml = locs.map(loc => {
    return `<details class="location flex space-between">
                    <summary>
                    <h3>
                        <i class="fa-solid fa-location-dot"></i>
                        <span>${loc.name}</span>
                    </h3>
                    </summary>

                    <p><span>CreatedAt</span> <span>${loc.createdAt}</span></p>
                    <p><span>EditedAt</span> <span>${loc.updatedAt}</span></p>
                    <p><span>Lat</span> <span>${loc.pos.lat}</span></p>
                    <p><span>Lng</span> <span>${loc.pos.lng}</span></p>

                    <div class="btns-con">
                        <button data-lat="${loc.pos.lat}" data-lng="${loc.pos.lng}" class="btn btn-go">
                            <i class="fa-solid fa-location-dot"></i>
                        </button>
                        <button data-id="${loc.id}" class="btn btn-delete">X</button>
                    </div>
                </details>`
  })
  document.querySelector('.locations').innerHTML = strHtml.join('')

  document
    .querySelectorAll('.btn-go')
    .forEach(elBtn => elBtn.addEventListener('click', controller.onGoToLoc))
  document
    .querySelectorAll('.btn-delete')
    .forEach(elBtn => elBtn.addEventListener('click', controller.onDeleteLoc))
}
