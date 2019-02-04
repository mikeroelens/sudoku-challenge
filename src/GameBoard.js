// @flow
/* eslint-disable immutable/no-mutation, class-methods-use-this */
import { opt, flattenList, Some, type Option } from 'js-option'
import { getSection } from './sections'

export type SudokuNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

type Tile = {
  rowIndex: number,
  colIndex: number,
  value: Option<SudokuNumber>,
}

export type GameBoardTiles = Array<Array<Tile>>

const GRID_SIZE = 9
const POSSIBLE_VALUES: Array<SudokuNumber> = [1, 2, 3, 4, 5, 6, 7, 8, 9]

class GameBoard {
  gameBoardTiles: GameBoardTiles

  constructor(gameBoardTiles: GameBoardTiles) {
    this.gameBoardTiles = gameBoardTiles
  }

  static buildTiles(values: Array<Array<?SudokuNumber>>): GameBoardTiles {
    return values.map((arrValues, rowIndex) =>
      arrValues.map((value, colIndex) => ({
        rowIndex,
        colIndex,
        value: opt(value),
      })),
    )
  }

  getCurrentRowValues(rowIndex: number): Array<SudokuNumber> {
    return flattenList(this.gameBoardTiles[rowIndex].map(tile => tile.value))
  }

  getCurrentColValues(colIndex: number): Array<SudokuNumber> {
    return flattenList(
      this.gameBoardTiles.map(tileRow => tileRow[colIndex]).map(tile => tile.value),
    )
  }

  getCurrentSectionValues(rowIndex: number, colIndex: number): Array<SudokuNumber> {
    const { rowIndexStart, rowIndexEnd, colIndexStart, colIndexEnd } = getSection(
      rowIndex,
      colIndex,
    )

    const sectionRows = this.gameBoardTiles.slice(rowIndexStart, rowIndexEnd + 1)

    const sectionTiles = sectionRows.map(tileRow =>
      tileRow.slice(colIndexStart, colIndexEnd + 1),
    )

    const sectionValues: Array<Option<SudokuNumber>> = []

    for (let i = 0; i < sectionTiles.length; i++) {
      for (let j = 0; j < sectionTiles[i].length; j++) {
        sectionValues.push(sectionTiles[i][j].value)
      }
    }

    return flattenList(sectionValues)
  }

  getPossibleValues(tile: Tile): Array<SudokuNumber> {
    const { rowIndex, colIndex } = tile

    const currentRowValues = this.getCurrentRowValues(rowIndex)
    const currentColValues = this.getCurrentColValues(colIndex)
    const currentSectionValues = this.getCurrentSectionValues(rowIndex, colIndex)
    const allCurrentValues = [
      ...currentRowValues,
      ...currentColValues,
      ...currentSectionValues,
    ]

    return POSSIBLE_VALUES.filter(value => !allCurrentValues.includes(value))
  }

  checkIfSolved() {
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const tile = this.gameBoardTiles[i][j]

        if (!tile.value.isDefined()) {
          return false
        }
      }
    }

    return true
  }

  solve() {
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const tile = this.gameBoardTiles[i][j]

        if (!tile.value.isDefined()) {
          const possibleValues = this.getPossibleValues(tile)

          if (possibleValues.length === 1) {
            this.gameBoardTiles[tile.rowIndex][tile.colIndex] = {
              rowIndex: tile.rowIndex,
              colIndex: tile.colIndex,
              value: new Some(possibleValues[0]),
            }
          }
        }
      }
    }

    if (!this.checkIfSolved()) {
      this.solve()
    }
  }

  static buildRowString(row: Array<Tile>): string {
    // flow-disable-next-line
    return row.map(tile => tile.value.getOrElse('-')).join(' ')
  }

  toString() {
    const rowStrings = this.gameBoardTiles.map(tileRow =>
      GameBoard.buildRowString(tileRow),
    )
    return rowStrings.join('\n')
  }
}

export default GameBoard
