export interface Cell {
    value: number | null;
    element?: HTMLElement;
    lastChangeIndex?: number;
}

export interface GridCell {
    value: number | null;
    row: number;
    column: number;
    cellRef: Cell | null;
}

export type Row = Cell[];
export type Grid = Row[];
export type Dictionary<T> = { [key: string]: T };

export const FLICKER_DURATION = 2000;
export const DEFAULT_SEQUENCE_LENGTH = 5;
export const DUPLICATE_FIBONACCI_NUMBER = 1;
export const DEFAULT_GRID_SIZE = 10;
