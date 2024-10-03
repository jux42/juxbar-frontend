import { TestBed } from '@angular/core/testing';

import { PersonalCocktailService } from './personal-cocktail.service';

describe('PersonalCocktailService', () => {
  let service: PersonalCocktailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalCocktailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
