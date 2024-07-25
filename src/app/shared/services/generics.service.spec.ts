import { TestBed } from '@angular/core/testing';

import { GenericsService } from './generics.service';

describe('GenericsService', () => {
  let service: GenericsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
