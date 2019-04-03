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

	fmt.Println(rand.Intn(3) - 1)

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

func getNeighborDirection(maze []cell, current cell, direction int) {
	index := 0
	if direction == 0 {

	}
}

func getNeighbors(maze []cell, current cell) []cell {
	var neighbors []cell

	return neighbors
}

func main() {
	var maze []cell
	maze = startEmptyMaze(maze)
	maze = setDefaultValues(maze)
	current := maze[1]
	for true {
		next := getNeighbors(maze, current)
		fmt.Println(next)
		printMaze(maze)
		fmt.Println(current)
	}
}
