import { Grid } from '../app.types';

export function getEmptyGrid(length: number = 50): Grid {
    return Array.from({ length }, (_, i) => {
        return Array.from({ length }, () => ({ value: null }));
    });
}
