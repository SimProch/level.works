import { DEFAULT_GRID_SIZE, Grid } from '../app.types';

export function getEmptyGrid(length: number = DEFAULT_GRID_SIZE): Grid {
    return Array.from({ length }, (_, i) => {
        return Array.from({ length }, () => ({ value: null }));
    });
}
