export const util = {
  makeId,
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
