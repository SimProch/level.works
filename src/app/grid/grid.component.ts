import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Cell, FLICKER_DURATION, Grid } from '../app.types';
import { FibonacciService } from '../fibonacci.service';
import { getEmptyGrid } from '../helpers/getEmptyGrid';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements AfterViewInit {
    @ViewChild('gridHolder') _gridHolder!: ElementRef<HTMLDivElement>;

    private _grid: Grid;

    constructor(private _renderer: Renderer2, private _fibonacci: FibonacciService) {
        this._grid = getEmptyGrid();
    }

    ngAfterViewInit(): void {
        this._renderGrid();
    }

    _resetGrid(): void {
        this._grid = getEmptyGrid();
        this._removeGrid();
        this._renderGrid();
    }

    private _removeGrid() {
        const gridElement = this._gridHolder.nativeElement;
        while (gridElement.firstChild) gridElement.removeChild(gridElement.firstChild);
    }

    _renderGrid(): void {
        const gridElement = this._gridHolder.nativeElement;
        const self = this;
        let lastAppliedChangeIndex = 0;
        this._grid.forEach((row, rowIndex) => {
            const rowElement: HTMLDivElement = this._renderer.createElement('div');
            rowElement.classList.add('grid__row');
            row.forEach((cell, cellIndex) => {
                const cellElement: HTMLDivElement = this._renderer.createElement('div');
                this._renderer.appendChild(rowElement, cellElement);
                cell.element = cellElement;
                cell.element.classList.add('grid__row__cell');
                cell.element.addEventListener('click', function () {
                    self._onItemClick(rowIndex, cellIndex, cell, lastAppliedChangeIndex++);
                });
            });
            this._renderer.appendChild(gridElement, rowElement);
        });
    }

    private _onItemClick(column: number, row: number, cell: Cell, lastChangeIndex: number): void {
        this._updateCells(cell, column, row, lastChangeIndex);
        this._findFibonacciSeries();
    }

    private _updateCells(cell: Cell, column: number, row: number, lastChangeIndex: number) {
        const updatedCells: Cell[] = [];
        this._updateCell(cell, updatedCells, lastChangeIndex);
        for (let i = 0; i < this._grid.length; i++) {
            const rowCell = this._grid[column][i];
            const columnCell = this._grid[i][row];
            if (rowCell !== cell) this._updateCell(rowCell, updatedCells, lastChangeIndex);
            if (columnCell !== cell) this._updateCell(columnCell, updatedCells, lastChangeIndex);
        }
        this._scheduleColorRemoval(updatedCells, lastChangeIndex);
    }

    private _updateCell(cell: Cell, updatedCells: Cell[], lastChangeIndex: number): void {
        cell.value ??= 0;
        cell.value++;
        cell.lastChangeIndex = lastChangeIndex;
        cell.element!.innerText = cell.value + '';
        cell.element!.classList.add('grid__row__cell--updated');
        updatedCells.push(cell);
    }

    private _scheduleColorRemoval(updatedCells: Cell[], lastChangeIndex: number): void {
        setTimeout(() => {
            updatedCells.forEach((cell) => {
                if (cell.lastChangeIndex == lastChangeIndex) {
                    cell.element?.classList.remove('grid__row__cell--updated');
                }
            });
        }, FLICKER_DURATION);
    }

    private _findFibonacciSeries(): void {
        const cells = this._fibonacci.getFibonacciCells(this._grid);
        this._updateFibonacciCells(cells);
        this._scheduleFibonacciCellRemoval(cells);
    }

    private _updateFibonacciCells(cells: Cell[]): void {}

    private _scheduleFibonacciCellRemoval(cells: Cell[]): void {}
}
