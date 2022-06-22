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
                    <p><span>Lat</span> <span>${loc.loc.lat}</span></p>
                    <p><span>Lng</span> <span>${loc.loc.lng}</span></p>

                    <div class="btns-con">
                        <button class="btn btn-go onclick="onGoTo(${loc.loc})"">
                            <i class="fa-solid fa-location-dot"></i>
                        </button>
                        <button class="btn btn-delete onclick="onDeleteLoc(${loc.id})"">X</button>
                    </div>
                </details>`
  })
  document.querySelector('.locations').innerHTML = strHtml.join('')
}
