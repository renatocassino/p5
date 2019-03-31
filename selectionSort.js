var list = []
var widthCanvas = 400
var heightCanvas = 400
var qtBars = 100
var widthBar = widthCanvas / qtBars
var i
var j
var state = 'RUN'
var sort
var indexSelected

function setup() {
  createCanvas(widthCanvas, heightCanvas)

  var arr = createArray()
  arr.forEach(function(item, index) {
    list.push(new Bar(item, index))
  })
  i = 0
  j = 1
  sort = selectionSortGenerator()
}

function createArray() {
  var arr = []
  for(let i = 0; i < qtBars; i++) arr.push(i+1)

  var newArr = []
  while(arr.length > 0) {
    newArr.push(arr.splice(floor(random(arr.length)), 1)[0])
  }

  return newArr
}

function draw() {
  background(51)
  list.forEach(function(item) {
    item.show()
  })

  if (state === 'RUN') {
    sort.next()
  }
}

function* selectionSortGenerator() {
  for(i = 0; i < list.length - 1; i++) {
    indexSelected = i
    for(j = i+1; j < list.length; j++) {
      if (list[j].value < list[indexSelected].value) {
        indexSelected = j
      }
      yield
    }

    var aux = list[i]
    list[i] = list[indexSelected]
    list[indexSelected] = aux
    list[indexSelected].index = indexSelected
    list[i].index = i
  }
}

function Bar(value, index) {
  this.value = value
  this.index = index
  var heightBar = this.value * widthBar

  this.show = function() {
    noStroke()

    if (this.index === indexSelected) {
      fill(255, 255, 0, 100)
    } else if(this.index === i) {
      fill(255, 0, 0, 100)
    } else if (this.index === j) {
      fill(255, 255, 255, 100)
    } else {
      fill(255, 0, 255, 100)
    }
    rect(this.index * widthBar, height - heightBar, widthBar, heightBar)
  }
}
