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
const addTape = (_tire, tapeSize) => {
  const tire = [..._tire]
  const position = tire[0]
  const newPosition = position + tapeSize

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

const solveTire = (tire, tireSize = 0, tapeSize) => {
  debugger
  const newIndex = addTape(tire, tapeSize)
  if (newIndex === -1) return tireSize + tapeSize

  tireSize += tapeSize
  return Math.min(
    solveTire(tire.slice(newIndex), tireSize, tapes[0]),
    solveTire(tire.slice(newIndex), tireSize, tapes[1]),
  )
}

const run = () => {
  let i = 0

  let less = null
  while(i < qtGaps) {
    const minSize = Math.min(
      solveTire(newTire(i), 0, tapes[0]),
      solveTire(newTire(i), 0, tapes[1]),
    )

    if (less === null || minSize < less) less = minSize
    i++
  }

  console.log(less)
}

run()

module.exports = {
  newTire,
}