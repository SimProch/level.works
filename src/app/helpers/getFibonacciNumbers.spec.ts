import { getFibonacciNumber, getFibonacciNumbers } from './getFibonacciNumbers';

describe('getFibonacciNumber', () => {
    it('Should not work for numbers less than 0', () => {
        expect(() => getFibonacciNumber(-1)).toThrowError('Invalid fibonacci numbers');
        expect(() => getFibonacciNumber(-10)).toThrowError('Invalid fibonacci numbers');
        expect(() => getFibonacciNumber(-100)).toThrowError('Invalid fibonacci numbers');
    });
    it('Should return 0 for 0th number', () => {
        expect(getFibonacciNumber(0)).toBe(0);
    });
    it('Should return 1 for 1th number', () => {
        expect(getFibonacciNumber(1)).toBe(1);
    });
    it('Should return the sum of previous fibonacci numbers', () => {
        const fib10 = getFibonacciNumber(10);
        const fib11 = getFibonacciNumber(11);
        const fib12 = getFibonacciNumber(12);
        expect(fib12).toBe(fib10 + fib11);
    });
});

describe('getFibonacciNumbers', () => {
    it('Should return array of length 44 for 10 clicks per second', () => {
        expect(getFibonacciNumbers().length).toBe(44);
    });
});
