import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Cell, FLICKER_DURATION, Grid } from '../app.types';
import { getEmptyGrid } from '../helpers/getEmptyGrid';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements AfterViewInit {
    @ViewChild('gridHolder') _gridHolder!: ElementRef<HTMLDivElement>;

    private _grid: Grid;

    constructor(private _renderer: Renderer2) {
        this._grid = getEmptyGrid();
    }

    ngAfterViewInit(): void {
        this._renderGrid();
    }

    _resetGrid(): void {
        this._grid = getEmptyGrid();
        this._gridHolder.nativeElement.innerHTML = '';
        this._renderGrid();
    }

    _renderGrid(): void {
        const gridElement = this._gridHolder.nativeElement;
        const self = this;
        this._grid.forEach((row, rowIndex) => {
            const rowElement: HTMLDivElement = this._renderer.createElement('div');
            rowElement.classList.add('grid__row');
            row.forEach((cell, cellIndex) => {
                const cellElement: HTMLDivElement = this._renderer.createElement('div');
                this._renderer.appendChild(rowElement, cellElement);
                cell.element = cellElement;
                cell.element.classList.add('grid__row__cell');
                cell.element.addEventListener('click', function () {
                    self._onItemClick(rowIndex, cellIndex, cell);
                });
            });
            this._renderer.appendChild(gridElement, rowElement);
        });
    }

    private _onItemClick(column: number, row: number, cell: Cell): void {
        this._updateCells(cell, column, row);
        this._findFibonacciSeries();
    }

    private _updateCells(cell: Cell, column: number, row: number) {
        const updatedCells: Cell[] = [];
        this._updateCell(cell, updatedCells);
        for (let i = 0; i < this._grid.length; i++) {
            const rowCell = this._grid[column][i];
            const columnCell = this._grid[i][row];
            if (rowCell !== cell) this._updateCell(rowCell, updatedCells);
            if (columnCell !== cell) this._updateCell(columnCell, updatedCells);
        }
        this._scheduleColorRemoval(updatedCells);
    }

    private _updateCell(cell: Cell, updatedCells: Cell[]): void {
        cell.value ??= 0;
        cell.value++;
        cell.element!.innerText = cell.value + '';
        cell.element?.classList.add('grid__row__cell--updated');
        updatedCells.push(cell);
    }

    private _scheduleColorRemoval(updatedCells: Cell[]): void {
        setTimeout(() => {
            updatedCells.forEach((cell) => {
                cell.element?.classList.remove('grid__row__cell--updated');
            });
        }, FLICKER_DURATION);
    }

    private _findFibonacciSeries(): void {}
}
