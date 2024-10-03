import { TestBed } from '@angular/core/testing';

import { GenericDrinkService } from './generic-drink.service';

describe('GenericDrinkService', () => {
  let service: GenericDrinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericDrinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
