export interface Cell {
    value: number | null;
    element?: HTMLElement;
}

export type Row = Cell[];
export type Grid = Row[];

export const FLICKER_DURATION = 2000;
