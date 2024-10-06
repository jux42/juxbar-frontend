import { TestBed } from '@angular/core/testing';

import { PasswordCkeckerService } from './password-ckecker.service';

describe('PasswordCkeckerService', () => {
  let service: PasswordCkeckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordCkeckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
