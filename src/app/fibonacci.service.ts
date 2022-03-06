import { Injectable } from '@angular/core';
import {
    Cell,
    DEFAULT_SEQUENCE_LENGTH,
    Dictionary,
    DUPLICATE_FIBONACCI_NUMBER as DUPLICATE_FIB_NUMBER,
    Grid,
    GridCell,
} from './app.types';
import { getFibonacciNumbers } from './helpers/getFibonacciNumbers';

@Injectable({
    providedIn: 'root',
})
export class FibonacciService {
    private _fibsToIndex: Dictionary<number> = {};
    private _indexToFibs: Dictionary<number> = {};
    private _sequenceLength = DEFAULT_SEQUENCE_LENGTH;

    constructor() {
        const fibs = getFibonacciNumbers();
        fibs.forEach((fib, i) => {
            this._fibsToIndex[fib] = i;
            this._indexToFibs[i] = fib;
        });
    }

    /**
     * Function that finds five consecutive fibonacci numbers in a grid
     * The consecutive numbers can be left-to-right, right-to-left, top-down or bottom-up.
     * Should there be a sequence longer than length, this sequence accounts for two different sequences.
     * For example, if there's a sequence [1,1,2,3,5,8] for sequenceLength = 5, then this accounts for two sequences.
     * First sequence: [1,1,2,3,5]
     * Second sequence: [1,2,3,5,8]
     *
     * @param grid specifies the visible grid of numbers
     * @param row specifies the column index of clicked cell
     * @param column specifies the row index of clicked cell
     * @returns array of adjacent cells that contain fibonacci sequence
     */
    getFibonacciCells(grid: Grid, row: number, column: number): Array<GridCell[]> {
        const result: Array<GridCell[]> = [];
        for (let i = 0; i < grid.length; i++) {
            const rowCell = grid[row][i];
            const columnCell = grid[i][column];
            const rowSequence = this._findSequences(rowCell, grid, row, i);
            const columnSequence = this._findSequences(columnCell, grid, i, column);
            if (rowSequence) result.push(...rowSequence);
            if (columnSequence) result.push(...columnSequence);
        }
        return result;
    }

    private _findSequences(
        cell: Cell,
        grid: Grid,
        row: number,
        column: number,
    ): Array<GridCell[]> | undefined {
        const currentCellHasFibonacci = this._fibsToIndex[cell.value!] != undefined;
        if (!currentCellHasFibonacci) return;
        const result: Array<GridCell[]> = [];
        const verticalSequence = this._findVerticalSequence(grid, row, column);
        const horizontalSequence = this._findHorizontalSequence(grid, row, column);
        if (verticalSequence) result.push(...verticalSequence);
        if (horizontalSequence) result.push(...horizontalSequence);
        return result;
    }

    private _findVerticalSequence(
        grid: Grid,
        row: number,
        column: number,
    ): Array<GridCell[]> | undefined {
        const allSequenceElements = this._getVerticalFibsForCurrentNode(grid, column, row);
        if (allSequenceElements.length < this._sequenceLength) return;
        const topDownSequenceElements = allSequenceElements.sort((x, y) => x.row - y.row);
        const topDownSequences = this._getSequences(topDownSequenceElements);
        const bottomUpSequenceElements = topDownSequenceElements.reverse();
        const bottomUpSequences = this._getSequences(bottomUpSequenceElements);
        const result = [...topDownSequences, ...bottomUpSequences];
        return result.length > 0 ? result : undefined;
    }

    private _getVerticalFibsForCurrentNode(grid: Grid, column: number, row: number): GridCell[] {
        const gridCell = this._getGridCell(grid, column, row);
        const adjacentElements = [gridCell];
        for (let i = 1; i <= this._sequenceLength - 1; i++) {
            const cellAbove = this._getGridCell(grid, column, row - i);
            const cellBelow = this._getGridCell(grid, column, row + i);
            adjacentElements.push(cellAbove, cellBelow);
        }
        const elementsWithinGrid = adjacentElements.filter(
            (el) => el.row > -1 && el.row < grid.length,
        );
        const fibonacciElements = elementsWithinGrid.filter(
            (i) => this._fibsToIndex[i.value!] != null,
        );
        return fibonacciElements;
    }

    private _getGridCell(grid: Grid, column: number, row: number): GridCell {
        return {
            value: grid[row]?.[column]?.value,
            row,
            column,
            cellRef: grid[row]?.[column],
        };
    }

    private _getSequences(sequenceElements: GridCell[]): Array<GridCell[]> {
        const result: Array<GridCell[]> = [];
        for (let i = 0; i < sequenceElements.length; i++) {
            const sequence = sequenceElements.slice(i, i + this._sequenceLength);
            if (sequence.length < this._sequenceLength) break;
            const isValidSequence = this._isSequenceValid(sequence);
            if (isValidSequence) result.push(sequence);
        }
        return result;
    }

    private _isSequenceValid(sequence: GridCell[]): boolean {
        let oneAlreadyInSequence = false;
        for (let i = 0; i < sequence.length - 1; i++) {
            const currentFib = sequence[i].value!;
            const nextFib = sequence[i + 1].value!;
            const comparingOnes = currentFib === DUPLICATE_FIB_NUMBER && nextFib === currentFib;
            if (comparingOnes && !oneAlreadyInSequence) {
                oneAlreadyInSequence = true;
                continue;
            }
            const currentFibonacciIndex = this._fibsToIndex[currentFib];
            const nextFibonacciIndex = this._fibsToIndex[nextFib];
            if (currentFibonacciIndex + 1 !== nextFibonacciIndex) return false;
        }
        return true;
    }

    private _findHorizontalSequence(
        grid: Grid,
        row: number,
        column: number,
    ): Array<GridCell[]> | undefined {
        const allSequenceElements = this._getHorizontalFibsForCurrentNode(grid, column, row);
        if (allSequenceElements.length < this._sequenceLength) return;
        const leftToRightSequenceElements = allSequenceElements.sort((x, y) => x.column - y.column);
        const leftToRightSequences = this._getSequences(leftToRightSequenceElements);
        const rightToleftSequenceElements = leftToRightSequenceElements.reverse();
        const rightToLeftSequences = this._getSequences(rightToleftSequenceElements);
        const result = [...leftToRightSequences, ...rightToLeftSequences];
        return result.length > 0 ? result : undefined;
    }

    private _getHorizontalFibsForCurrentNode(grid: Grid, column: number, row: number): GridCell[] {
        const gridCell = this._getGridCell(grid, column, row);
        const adjacentElements = [gridCell];
        for (let i = 1; i <= this._sequenceLength - 1; i++) {
            const cellAbove = this._getGridCell(grid, column - i, row);
            const cellBelow = this._getGridCell(grid, column + i, row);
            adjacentElements.push(cellAbove, cellBelow);
        }
        const elementsWithinGrid = adjacentElements.filter(
            (el) => el.column > -1 && el.column < grid.length,
        );
        const fibonacciElements = elementsWithinGrid.filter(
            (i) => this._fibsToIndex[i.value!] != null,
        );
        return fibonacciElements;
    }
}
