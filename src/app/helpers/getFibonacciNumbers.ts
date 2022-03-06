import { Dictionary } from '../app.types';

const cache: Dictionary<number> = {};
const clicksPerSecond = 10;
const clicksPerMinute = clicksPerSecond * 60;
const clicksPerHour = clicksPerMinute * 60;
const clicksPerDay = clicksPerHour * 24;
/**
 * Very optimistic calculation of possible clicks in a year.
 * Expects non-stop clicks per second for a year.
 */
const clicksPerYear = clicksPerDay * 365;

export function getFibonacciNumber(n: number): number {
    if (n < 0) throw new Error('Invalid fibonacci numbers');
    if (n === 0 || n === 1) return n;
    if (!cache[n]) cache[n] = getFibonacciNumber(n - 1) + getFibonacciNumber(n - 2);
    return cache[n];
}

/**
 * Function that returns an array of fibonacci numbers.
 * The amount depends on semi-reasonable calculation of fibonacci numbers that could occur in grid.
 * @returns fibonacci numbers up
 */
export function getFibonacciNumbers(): number[] {
    const result = [];
    let lastFibonacciNumber = 0;
    let index = 0;
    while (lastFibonacciNumber < clicksPerYear) {
        lastFibonacciNumber = getFibonacciNumber(index);
        result.push(lastFibonacciNumber);
        index++;
    }
    return result;
}
