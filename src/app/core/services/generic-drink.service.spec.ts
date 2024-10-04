import {TestBed} from '@angular/core/testing';

import {GenericDrinkService} from './generic-drink.service';
import {Drink} from "../models/drink";

describe('GenericDrinkService', () => {
  let service: GenericDrinkService<Drink>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericDrinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
