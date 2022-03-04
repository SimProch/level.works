import { Injectable } from '@angular/core';
import { Cell, Dictionary, Grid } from './app.types';
import { getFibonacciNumbers } from './helpers/getFibonacciNumbers';

@Injectable({
    providedIn: 'root',
})
export class FibonacciService {
    private _fibsToIndex: Dictionary<number> = {};
    private _indexToFibs: Dictionary<number> = {};

    constructor() {
        const fibs = getFibonacciNumbers();
        fibs.forEach((fib, i) => {
            this._fibsToIndex[fib] = i;
            this._indexToFibs[i] = fib;
        });
    }

    getFibonacciCells(grid: Grid): Cell[] {
        return [];
    }
}
