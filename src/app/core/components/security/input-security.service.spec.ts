import { TestBed } from '@angular/core/testing';

import { InputSecurityService } from './input-security.service';

describe('InputSecurityService', () => {
  let service: InputSecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputSecurityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
