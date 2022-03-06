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

/**
 * Number 1 occurs twice in fibonacci series (0,1,1,2,3,5,8)
 */
export const DUPLICATE_FIB_NUMBER = 1;

/**
 * Specifies the duration how long cells will be colored differently
 */
export const FLICKER_DURATION = 500;
/**
 * Specifies the length of series searched for
 */
export const DEFAULT_SEQUENCE_LENGTH = 5;
/**
 * Specifies the grid size (rendered elements)
 */
export const DEFAULT_GRID_SIZE = 50;
