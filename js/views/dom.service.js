export const domService = {
    renderFavLocs,
}


function renderFavLocs(locs) {
    let strHtml = locs.map(loc => {
        return `
        `
    })
    document.querySelector('.locations').innerHTML = strHtml.join('')
}

