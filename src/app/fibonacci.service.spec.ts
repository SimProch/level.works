import { TestBed } from '@angular/core/testing';

import { FibonacciService } from './fibonacci.service';

describe('FibonacciService', () => {
    let service: FibonacciService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FibonacciService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
