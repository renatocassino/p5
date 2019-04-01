const qtGaps = 5
const tireSize = 20
const tapes = [2, 3]

const gaps = [2, 5, 8, 11, 15]

const newTire = (index) => {
  const gapsClone = [...gaps]
  const firstGaps = gapsClone.splice(0, index)

  while(firstGaps.length > 0) {
    gapsClone.push(firstGaps.shift() + tireSize)
  }

  return gapsClone
}

// retornar o quantos furos foram tapados
const addTape = (_tire, tapeIndex) => {
  const tire = [..._tire]
  const position = tire[0]
  const newPosition = position + tapes[tapeIndex]

  let counter = 0
  while (counter < tire.length - 1) {
    const nextGap = tire[counter + 1]
    if (!nextGap) return -1

    if (nextGap > newPosition) {
      return counter + 1
    }

    counter += 1
  }

  return -1
}

const solveTire = (tire, tireSize = 0) => {
  for (let i = 0; i < tapes.length; i++ ) {
    const newIndex = addTape(tire, 0)
    if (newIndex === -1) return tireSize + tapes[i]

    tireSize += tapes[i]
    return solveTire(tire.slice(newIndex), tireSize)
  }
}

const run = () => {
  let i = 0
  let tapeSize = 0

  while(i < qtGaps) {
    const sizeTape = solveTire(newTire(i))
    console.log(sizeTape)
    i++
  }
}

run()

module.exports = {
  newTire,
}