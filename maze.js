var cols, rows
var w = 10
var grid = []
var current
var stack = []
var state = 'DRAWING'
var backDrawing = false

function setup() { 
  createCanvas(800, 600)
  frameRate(50)
  cols = floor(width/w)
  rows = floor(height/w)

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      var cell = new Cell(i, j)
      grid.push(cell)
    }
  }

  current = grid[0]
  grid[floor(parseInt(grid.length-1)/2) - 10].final = true
} 

let counter = 0

function draw() {
  background(51)
  for (let i = 0; i < grid.length; i++) {
    grid[i].show()
  }
  counter = 0

  current.visited = true
  current.highlight()

  if (state === 'DRAWING') {
    var next = current.getRandomNeighbor() // step 1
    if (next) {
      next.visited = true
      stack.push(current) // step 2
      removeWall(current, next) // step 3
      current = next // step 4
    } else if (stack.length > 0) {
      if (backDrawing) {
        current = stack.pop()
      } else {
        do {
          current = stack.pop()
        } while(!current.getRandomNeighbor() && stack.length > 0)
      }
    } else {
      state = 'SEARCH'
    }
  } else if (state === 'SEARCH') {
    frameRate(8)
    if (current.final) {
      state = 'FINISHED'
      return
    }

    current.walked = true
    current.walking = true
    var next = current.getFirstNeighbor()
    if (next) {
      next.walked = true
      next.walking = true
      stack.push(current)
      current = next
    } else if (stack.length > 0) {
      current.walking = false
      current = stack.pop()
    }
  } else if (state === 'FINISHED') {
    alert('o/')
    state = 'CLOSE'
  }
}

function removeWall(a, b) {
  var x = a.x - b.x
  if (x === 1) {
    a.walls[3] = false
    b.walls[1] = false
  } else if (x === -1) {
    a.walls[1] = false
    b.walls[3] = false
  }

  var y = a.y - b.y
  if (y === 1) {
    a.walls[0] = false
    b.walls[2] = false
  } else if (y === -1) {
    a.walls[2] = false
    b.walls[0] = false
  }
}

function index (i, j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
    return -1
  }

  return i + j * cols
}

function Cell(i, j) {
  this.x = i
  this.y = j
  this.visited = false // while building
  this.walked = false // while searching
  this.walls = [true, true, true, true]

  this.final = false // if is final space

  this.highlight = function() {
    var x = this.x * w
    var y = this.y * w
    noStroke()
    fill(0, 0, 255, 100)
    rect(x, y, w, w)
  }

  this.getNeigbors = function() {
    var top = grid[index(this.x, this.y - 1)]
    var right = grid[index(this.x + 1, this.y)]
    var bottom = grid[index(this.x, this.y + 1)]
    var left = grid[index(this.x - 1, this.y)]

    return [top, right, bottom, left]
  }

  this.getNeighborsNotVisited = function() {
    var neighbors = []

    var neighborsPosition = this.getNeigbors()
    var top = neighborsPosition[0]
    var right = neighborsPosition[1]
    var bottom = neighborsPosition[2]
    var left = neighborsPosition[3]

    if (top && !top.visited) neighbors.push(top)
    if (right && !right.visited) neighbors.push(right)
    if (bottom && !bottom.visited) neighbors.push(bottom)
    if (left && !left.visited) neighbors.push(left)

    return neighbors
  }

  this.getFirstNeighbor = function() {
    var neighborsPosition = this.getNeigbors()
    var top = neighborsPosition[0]
    var right = neighborsPosition[1]
    var bottom = neighborsPosition[2]
    var left = neighborsPosition[3]
    var neighbors = []

    if (top && !top.walked && !this.walls[0]) neighbors.push(top)
    if (right && !right.walked && !this.walls[1]) neighbors.push(right)
    if (bottom && !bottom.walked && !this.walls[2]) neighbors.push(bottom)
    if (left && !left.walked && !this.walls[3]) neighbors.push(left)

    return neighbors[floor(random(0, neighbors.length))]
  }

  this.getRandomNeighbor = function() {
    var neighbors = this.getNeighborsNotVisited()
    if (neighbors.length > 0) {
      var size = floor(random(0, neighbors.length))
      return neighbors[size]
    }
  }

  this.show = function () {
    if (!this.visited && !this.walked) return
    var x = this.x * w
    var y = this.y * w

    stroke(255)
    if (this.walls[0]) line(x, y, x+w, y) // top
    if (this.walls[1]) line(x+w, y, x+w, y+w) // right
    if (this.walls[2]) line(x, y+w, x+w, y+w) //bottom
    if (this.walls[3]) line(x, y+w, x, y) // left

    if (this.final) {
      noStroke()
      fill(255, 0, 0, 100)
      rect(x, y, w, w)
    } else if (this.walking) {
      noStroke()
      fill(0, 255, 0, 100)
      rect(x, y, w, w)
    } else if (this.walked) {
      noStroke()
      fill(0, 255, 0, 60)
      rect(x, y, w, w)
    } else if (this.visited) {
      noStroke()
      fill(255, 0, 255, 100)
      rect(x, y, w, w)
    }
  }
}