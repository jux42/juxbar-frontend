import {TestBed} from '@angular/core/testing';

import {MagicNumerFileValidationService} from './magic-numer-file-validation.service';

describe('FileValidationService', () => {
  let service: MagicNumerFileValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagicNumerFileValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
