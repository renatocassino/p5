package main

import (
	"fmt"
	"math/rand"
)

type cell struct {
	x       int
	y       int
	state   int
	isFinal bool
}

var (
	UNDEF  = -1
	SPACE  = 0
	WALL   = 1
	WIDTH  = 23
	HEIGHT = 11

	UP    = 0
	RIGHT = 1
	DOWN  = 2
	LEFT  = 3
)

func (c cell) GetChar() string {
	if c.state == UNDEF {
		return " . "
	}

	if c.state == SPACE {
		return "   "
	}

	if c.state == WALL {
		// return "█"
		// return "▄"
		return "■■■"
	}

	return "-"
}

func printMaze(maze []cell) {
	lastY := 0
	for _, cell := range maze {
		if lastY != cell.y {
			fmt.Print("\n")
			lastY = cell.y
		}

		fmt.Print(cell.GetChar())
	}
}

func startEmptyMaze(maze []cell) []cell {
	for y := 0; y < HEIGHT; y++ {
		for x := 0; x < WIDTH; x++ {
			if x == 0 || x == WIDTH-1 || y == 0 || y == HEIGHT-1 { // walls around
				maze = append(maze, cell{x, y, WALL, false})
			} else {
				maze = append(maze, cell{x, y, -1, false})
			}
		}
	}

	return maze
}

func setDefaultValues(maze []cell) []cell {
	maze[1].state = SPACE
	maze[len(maze)-2].state = SPACE
	maze[len(maze)-2].isFinal = true

	return maze
}

func index(maze []cell, x int, y int) int {
	if x < 0 || y < 0 || x > WIDTH-1 || y > HEIGHT-1 {
		return -1
	}

	return x + y*WIDTH
}

func getNeighborDirection(maze []cell, current cell, direction int) cell {
	indexCell := 0
	if direction == UP {
		indexCell = index(maze, current.x, current.y-1)
	} else if direction == RIGHT {
		indexCell = index(maze, current.x+1, current.y)
	} else if direction == DOWN {
		indexCell = index(maze, current.x, current.y+1)
	} else {
		indexCell = index(maze, current.x-1, current.y)
	}

	if indexCell == -1 {
		return current
	}
	return maze[indexCell]
}

func getNeighbors(maze []cell, current cell) []cell {
	var neighbors []cell

	up := getNeighborDirection(maze, current, UP)
	if up.y != current.y {
		neighbors = append(neighbors, up)
	}

	right := getNeighborDirection(maze, current, RIGHT)
	if right.x != current.x {
		neighbors = append(neighbors, right)
	}

	down := getNeighborDirection(maze, current, DOWN)
	if down.y != current.y {
		neighbors = append(neighbors, down)
	}

	left := getNeighborDirection(maze, current, LEFT)
	if left.x != current.x {
		neighbors = append(neighbors, left)
	}

	return neighbors
}

func getPossibleDirections(maze []cell, current cell) []cell {
	var directions []cell
	neighbors := getNeighbors(maze, current)

	for _, neighbor := range neighbors {
		if neighbor.state == UNDEF {
			directions = append(directions, neighbor)
		}
	}

	return directions
}

func getRandomDirection(maze []cell, current cell) cell {
	directions := getPossibleDirections(maze, current)

	index := rand.Intn(len(directions))
	fmt.Println(index)
	return directions[index]
}

func main() {
	var maze []cell
	maze = startEmptyMaze(maze)
	maze = setDefaultValues(maze)
	current := maze[1]
	for true {
		next := getRandomDirection(maze, current)
		next.state = SPACE
		current = next
		printMaze(maze)
	}
}
