import { Injectable } from '@angular/core';
import { Cell, Grid } from './app.types';

@Injectable({
    providedIn: 'root',
})
export class FibonacciService {
    constructor() {}

    getFibonacciCells(grid: Grid): Cell[] {
        return [];
    }
}
