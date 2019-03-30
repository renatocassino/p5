var cols, rows
var w = 10
var grid = []
var current
var stack = []

function setup() { 
  createCanvas(400, 400)
  // frameRate(50)
  cols = floor(width/w)
  rows = floor(height/w)

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      var cell = new Cell(i, j)
      grid.push(cell)
    }
  }

  current = grid[0]
} 

function draw() { 
  background(51)
  for (let i = 0; i < grid.length; i++) {
    grid[i].show()
  }

  current.visited = true
  current.highlight()

  // step 1
  var next = current.checkNeighbors()
  if (next) {
    next.visited = true

    // step 2
    stack.push(current)

    // step 3
    removeWall(current, next)

    // step 4
    current = next
  } else if (stack.length > 0) {
    current = stack.pop()
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
  this.visited = false
  this.walls = [true, true, true, true]

  this.highlight = function() {
    var x = this.x * w
    var y = this.y * w
    noStroke()
    fill(0, 0, 255, 100)
    rect(x, y, w, w)
  }

  this.checkNeighbors = function() {
    var neighbors = []

    var top = grid[index(this.x, this.y - 1)]
    var right = grid[index(this.x + 1, this.y)]
    var bottom = grid[index(this.x, this.y + 1)]
    var left = grid[index(this.x - 1, this.y)]

    if (top && !top.visited) {
      neighbors.push(top)
    }

    if (right && !right.visited) {
      neighbors.push(right)
    }

    if (bottom && !bottom.visited) {
      neighbors.push(bottom)
    }

    if (left && !left.visited) {
      neighbors.push(left)
    }

    if (neighbors.length > 0) {
      var size = floor(random(0, neighbors.length))
      return neighbors[size]
    }
  }

  this.show = function () {
    var x = this.x * w
    var y = this.y * w

    stroke(255)
    if (this.walls[0]) line(x, y, x+w, y) // top
    if (this.walls[1]) line(x+w, y, x+w, y+w) // right
    if (this.walls[2]) line(x, y+w, x+w, y+w) //bottom
    if (this.walls[3]) line(x, y+w, x, y) // left

    if (this.visited) {
      noStroke()
      fill(255, 0, 255, 100)
      rect(x, y, w, w)
    }
  }
}