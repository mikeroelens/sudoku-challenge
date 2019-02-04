// @flow

export type SectionName =
  | 'SECTION_ONE'
  | 'SECTION_TWO'
  | 'SECTION_THREE'
  | 'SECTION_FOUR'
  | 'SECTION_FIVE'
  | 'SECTION_SIX'
  | 'SECTION_SEVEN'
  | 'SECTION_EIGHT'
  | 'SECTION_NINE'

type SudokuSection = {
  name: SectionName,
  rowIndexStart: number,
  rowIndexEnd: number,
  colIndexStart: number,
  colIndexEnd: number,
}

const SectionOne: SudokuSection = {
  name: 'SECTION_ONE',
  rowIndexStart: 0,
  rowIndexEnd: 2,
  colIndexStart: 0,
  colIndexEnd: 2,
}

const SectionTwo: SudokuSection = {
  name: 'SECTION_TWO',
  rowIndexStart: 0,
  rowIndexEnd: 2,
  colIndexStart: 3,
  colIndexEnd: 5,
}

const SectionThree: SudokuSection = {
  name: 'SECTION_THREE',
  rowIndexStart: 0,
  rowIndexEnd: 2,
  colIndexStart: 6,
  colIndexEnd: 8,
}

const SectionFour: SudokuSection = {
  name: 'SECTION_FOUR',
  rowIndexStart: 3,
  rowIndexEnd: 5,
  colIndexStart: 0,
  colIndexEnd: 2,
}

const SectionFive: SudokuSection = {
  name: 'SECTION_FIVE',
  rowIndexStart: 3,
  rowIndexEnd: 5,
  colIndexStart: 3,
  colIndexEnd: 5,
}

const SectionSix: SudokuSection = {
  name: 'SECTION_SIX',
  rowIndexStart: 3,
  rowIndexEnd: 5,
  colIndexStart: 6,
  colIndexEnd: 8,
}

const SectionSeven: SudokuSection = {
  name: 'SECTION_SEVEN',
  rowIndexStart: 6,
  rowIndexEnd: 8,
  colIndexStart: 0,
  colIndexEnd: 2,
}

const SectionEight: SudokuSection = {
  name: 'SECTION_EIGHT',
  rowIndexStart: 6,
  rowIndexEnd: 8,
  colIndexStart: 3,
  colIndexEnd: 5,
}

const SectionNine = {
  name: 'SECTION_NINE',
  rowIndexStart: 6,
  rowIndexEnd: 8,
  colIndexStart: 6,
  colIndexEnd: 8,
}

export const getSection = (rowIndex: number, colIndex: number): SudokuSection => {
  if (rowIndex < 3) {
    if (colIndex < 3) {
      return SectionOne
    }

    if (colIndex < 6) {
      return SectionTwo
    }

    return SectionThree
  }
  if (rowIndex < 6) {
    if (colIndex < 3) {
      return SectionFour
    }

    if (colIndex < 6) {
      return SectionFive
    }

    return SectionSix
  }

  if (colIndex < 3) {
    return SectionSeven
  }

  if (colIndex < 6) {
    return SectionEight
  }

  return SectionNine
}
