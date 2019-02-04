// @flow
import GameBoard, { type SudokuNumber } from './GameBoard'

type Puzzle = {
  name: string,
  values: Array<Array<?SudokuNumber>>,
}

const puzzleA: Puzzle = {
  name: 'A',
  values: [
    [4, 5, null, 8, null, null, 9, null, null],
    [null, 9, null, null, 5, 6, null, null, 4],
    [1, null, null, null, null, null, null, null, 7],
    [2, 6, null, 5, 4, null, null, 9, null],
    [null, null, 4, 1, null, 2, 3, null, null],
    [null, 7, null, null, 6, 9, null, 4, 8],
    [7, null, null, null, null, null, null, null, 9],
    [8, null, null, 4, 9, null, null, 7, null],
    [null, null, 9, null, null, 3, null, 2, 5],
  ],
}

const puzzleB: Puzzle = {
  name: 'B',
  values: [
    [3, 6, null, 2, null, 5, null, null, null],
    [null, 1, 5, 4, null, 3, null, 8, null],
    [null, null, 4, 9, 1, null, null, null, null],
    [4, 5, 7, null, null, null, null, 9, 1],
    [null, null, 2, null, null, null, 3, null, null],
    [8, 3, null, null, null, null, 7, 6, 4],
    [null, null, null, null, 9, 4, 8, null, null],
    [null, 2, null, 3, null, 6, 1, 4, null],
    [null, null, null, 8, null, 2, null, 7, 9],
  ],
}

const puzzles: Array<Puzzle> = [puzzleA, puzzleB]

puzzles.forEach(puzzle => {
  const tiles = GameBoard.buildTiles(puzzle.values)
  const gameBoard = new GameBoard(tiles)

  console.log(`\n------ Puzzle ${puzzle.name}  ------`)
  console.log('Original:')
  console.log(gameBoard.toString())

  console.log('\nSolved:')
  gameBoard.solve()
  console.log(gameBoard.toString())
})
