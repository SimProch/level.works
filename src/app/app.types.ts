export interface Cell {
    value: number | null;
    element?: HTMLElement;
    lastChangeIndex?: number;
}

export type Row = Cell[];
export type Grid = Row[];

export const FLICKER_DURATION = 2000;
export type Dictionary<T> = { [key: string]: T };
